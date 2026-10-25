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
    const profileResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!profileResponse.ok) throw new Error(`GitHub profile returned ${profileResponse.status}`);

    const profile = (await profileResponse.json()) as GitHubProfile;
    return Response.json(
      {
        repos: profile.public_repos + GITHUB_STATS.privateRepos,
        followers: profile.followers,
        following: profile.following,
      },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch (error) {
    console.error("[github-activity] failed to fetch GitHub activity:", error);
    return Response.json({ error: "GitHub activity is temporarily unavailable" }, { status: 502 });
  }
}
