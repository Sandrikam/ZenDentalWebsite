import Image from "next/image";
import Link from "next/link";
import type { Doctor } from "@/content/doctors";
import type { Locale } from "@/lib/content";

export function DoctorCard({ doctor, locale, alt, headingLevel = "h3", priority = false, sizes = "(max-width: 700px) 50vw, (max-width: 1199px) 33vw, 25vw" }: {
  doctor: Doctor;
  locale: Locale;
  alt: string;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
  sizes?: string;
}) {
  const Heading = headingLevel;
  return <Link className="doctor-card" href={`/${locale}/team/${doctor.slug}`}>
    <span className="doctor-card-photo">
      <Image src={doctor.image.src} alt={alt.replace("{name}", doctor.name[locale])} width={doctor.image.width} height={doctor.image.height} sizes={sizes} priority={priority} />
    </span>
    <Heading className="doctor-card-name">{doctor.name[locale]}</Heading>
    <span className="doctor-card-role">{doctor.role[locale]}</span>
  </Link>;
}
