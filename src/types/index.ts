export interface ServiceType {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

export interface TestimonialType {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface FAQType {
  id: string;
  question: string;
  answer: string;
}

export interface CityType {
  id: string;
  name: string;
  isPopular: boolean;
}