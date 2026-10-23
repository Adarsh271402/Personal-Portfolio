"""Generate a clean one-page resume PDF for Adarsh Gupta (portfolio asset)."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable,
)
from reportlab.lib.enums import TA_LEFT

NAVY = HexColor("#1D2634")
ORANGE = HexColor("#E8622C")
GRAY = HexColor("#5F6470")

styles = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=26, leading=30, textColor=NAVY),
    "role": ParagraphStyle("role", fontName="Helvetica", fontSize=12.5, leading=16, textColor=ORANGE),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=9.5, leading=13, textColor=GRAY),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=10, leading=14.5, textColor=NAVY, alignment=TA_LEFT),
    "muted": ParagraphStyle("muted", fontName="Helvetica", fontSize=9.5, leading=13.5, textColor=GRAY),
    "item": ParagraphStyle("item", fontName="Helvetica-Bold", fontSize=10.5, leading=14, textColor=NAVY),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=9.8, leading=13.8, textColor=GRAY, leftIndent=10),
}


def side_heading(txt):
    return Paragraph(
        f'<font color="#E8622C"><b>{txt}</b></font>',
        ParagraphStyle("side", fontName="Helvetica-Bold", fontSize=10.5, leading=14, textColor=NAVY),
    )


doc = SimpleDocTemplate(
    "/home/z/my-project/public/resume.pdf",
    pagesize=A4,
    leftMargin=16 * mm, rightMargin=16 * mm, topMargin=14 * mm, bottomMargin=14 * mm,
    title="Adarsh Gupta - Resume",
    author="Adarsh Gupta",
)

story = []

# Header
story.append(Paragraph('<font color="#1D2634">Adarsh </font><font color="#E8622C">Gupta</font>', styles["name"]))
story.append(Paragraph("Full Stack &amp; .NET Developer", styles["role"]))
story.append(Spacer(1, 4))
story.append(Paragraph("adarshgupta02027@gmail.com  ·  github.com/Adarsh271402  ·  linkedin.com/in/adarsh4007  ·  India", styles["contact"]))
story.append(Spacer(1, 6))
story.append(HRFlowable(width="100%", thickness=1.4, color=ORANGE))
story.append(Spacer(1, 8))

story.append(Paragraph(
    "Passionate Full Stack Developer focused on .NET web technologies and modern UI/UX. "
    "I build scalable, clean and user-friendly applications — from REST APIs in ASP.NET Core "
    "to interactive React front-ends.",
    styles["body"],
))
story.append(Spacer(1, 10))

# Two column body
left = []
right = []

left.append(side_heading("EXPERIENCE"))
left.append(Spacer(1, 3))
left.append(Paragraph("Full Stack Developer Intern — ABC Company", styles["item"]))
left.append(Paragraph("2024 – 2025", styles["muted"]))
left.append(Paragraph("• Built production features with .NET, SQL Server and React.", styles["bullet"]))
left.append(Paragraph("• Collaborated in an agile team using Git and code reviews.", styles["bullet"]))
left.append(Paragraph("• Improved query performance and UI responsiveness.", styles["bullet"]))
left.append(Spacer(1, 8))
left.append(side_heading("PROJECTS"))
left.append(Spacer(1, 3))
left.append(Paragraph("Task Manager Pro", styles["item"]))
left.append(Paragraph(".NET · React · SQL Server — full-stack task app with auth, roles and real-time updates.", styles["bullet"]))
left.append(Spacer(1, 4))
left.append(Paragraph("E-Commerce Platform", styles["item"]))
left.append(Paragraph("ASP.NET · SQL Server · JavaScript — shopping platform with cart, orders and user management.", styles["bullet"]))
left.append(Spacer(1, 4))
left.append(Paragraph("Weather App", styles["item"]))
left.append(Paragraph("React · REST API · Tailwind CSS — real-time weather with location search.", styles["bullet"]))
left.append(Spacer(1, 8))
left.append(side_heading("EDUCATION"))
left.append(Spacer(1, 3))
left.append(Paragraph("B.Tech, Computer Science — 2025 to Present", styles["item"]))
left.append(Paragraph("Learning, building projects and exploring new technologies.", styles["muted"]))
left.append(Spacer(1, 4))
left.append(Paragraph("Higher Secondary (Science) — 2023 – 2024", styles["item"]))
left.append(Paragraph("Completed 12th and discovered my passion for coding.", styles["muted"]))

right.append(side_heading("TECHNICAL SKILLS"))
right.append(Spacer(1, 3))
right.append(Paragraph("<b>Core:</b> C#, .NET 8, ASP.NET Core, SQL Server", styles["bullet"]))
right.append(Paragraph("<b>Frontend:</b> React 19, TypeScript, JavaScript, Tailwind CSS", styles["bullet"]))
right.append(Paragraph("<b>Familiar:</b> Node.js, Bootstrap, HTML &amp; CSS", styles["bullet"]))
right.append(Paragraph("<b>Tools:</b> Git, GitHub, Postman, VS Code", styles["bullet"]))
right.append(Spacer(1, 8))
right.append(side_heading("STRENGTHS"))
right.append(Spacer(1, 3))
right.append(Paragraph("• Clean, maintainable code &amp; REST API design", styles["bullet"]))
right.append(Paragraph("• Fast learner — always exploring new tech", styles["bullet"]))
right.append(Paragraph("• Strong problem-solving fundamentals", styles["bullet"]))
right.append(Paragraph("• Team player with clear communication", styles["bullet"]))
right.append(Spacer(1, 8))
right.append(side_heading("LET'S CONNECT"))
right.append(Spacer(1, 3))
right.append(Paragraph(
    "I'm open to internships and junior full-stack roles where I can ship real products and grow fast.",
    styles["muted"],
))

table = Table([[left, right]], colWidths=[103 * mm, 75 * mm])
table.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (0, 0), (0)),
    ("RIGHTPADDING", (0, 0), (0, 0), (8)),
    ("LEFTPADDING", (1, 0), (1, 0), (8)),
    ("RIGHTPADDING", (1, 0), (1, 0), (0)),
]))
story.append(table)

doc.build(story)
print("resume.pdf generated")
