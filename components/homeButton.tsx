import Link from "next/link";

export default function HomeButton() {
    return (
        <Link
            href="/"
            style={{
                background: "transparent",
                border: "none",
                fontFamily: "inherit",
                fontSize: "1.1rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                cursor: "pointer",
                opacity: 0.6,
                textDecoration: "none",
                color: "inherit",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "opacity 0.2s ease",
                marginTop: "0.4rem"
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "0.6"}
        >
            Home
        </Link>
    );
}