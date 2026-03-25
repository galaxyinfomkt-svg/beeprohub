export interface Service {
  slug: string;
  icon: string;
  color: string;
}

export const services: Service[] = [
  { slug: "crm", icon: "users", color: "primary" },
  { slug: "automation", icon: "zap", color: "primary" },
  { slug: "leadgen", icon: "target", color: "primary" },
  { slug: "websites", icon: "globe", color: "primary" },
  { slug: "ads", icon: "megaphone", color: "primary" },
];
