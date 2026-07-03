import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface Section {
  title: string;
  category: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
}

export const sections: Section[] = [
  {
    title: "Liturgia de las Horas",
    category: "Liturgia",
    icon: "book-open-page-variant",
    color: "#123B63",
  },
  {
    title: "Meditación",
    category: "Meditación",
    icon: "meditation",
    color: "#4B6B88",
  },
  {
    title: "Devociones",
    category: "Devociones",
    icon: "hands-pray",
    color: "#7B5E57",
  },
  {
    title: "Formación",
    category: "Formación",
    icon: "school",
    color: "#5C7A3D",
  },
  {
    title: "Ofrecimientos",
    category: "Ofrecimientos",
    icon: "heart",
    color: "#A23B5A",
  },
];