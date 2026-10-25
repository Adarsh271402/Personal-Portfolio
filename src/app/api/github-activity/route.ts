import { GITHUB_STATS } from "@/lib/portfolio-data";

type GitHubProfile = {
  public_repos: number;
  followers: number;
  following: number;
};

export async function GET() {
  const username = GITHUB_STATS.username;
  const headers = { "User-Agent": "Adarsh-Portfolio", Accept: "application/vnd.github+json" };

  try {
    const [profileResponse, calendarResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://github.com/users/${username}/contributions`, {
        headers: { "User-Agent": "Adarsh-Portfolio" },
        next: { revalidate: 3600 },
      }),
    ]);

    if (!profileResponse.ok) throw new Error(`GitHub profile returned ${profileResponse.status}`);

    const profile = (await profileResponse.json()) as GitHubProfile;
    let contributions: { date: string; level: number }[] = [];
    let totalContributions: number | null = null;

    if (calendarResponse.ok) {
      const calendar = await calendarResponse.text();
      contributions = [...calendar.matchAll(/<td\b[^>]*\bdata-date="(\d{4}-\d{2}-\d{2})"[^>]*\bdata-level="([0-4])"[^>]*>/g)].map(
        ([, date, level]) => ({ date, level: Number(level) })
      );
      const total = calendar.match(/id="js-contribution-activity-description"[^>]*>\s*([\d,]+)\s+contributions?/);
      if (total) totalContributions = Number(total[1].replaceAll(",", ""));
    }

    return Response.json(
      {
        repos: profile.public_repos,
        followers: profile.followers,
        following: profile.following,
        contributions,
        totalContributions,
      },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch (error) {
    console.error("[github-activity] failed to fetch GitHub activity:", error);
    return Response.json({ error: "GitHub activity is temporarily unavailable" }, { status: 502 });
  }
}
