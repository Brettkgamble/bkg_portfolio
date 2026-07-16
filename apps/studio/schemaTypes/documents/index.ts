import { author } from "../blocks/author";
import { blog } from "./blog";
import { blogIndex } from "./blog-index";
import { categoryType } from "./categories";
import { certificate } from "./certificate";
import { customer } from "./customer";
import { faq } from "./faq";
import { footer } from "./footer";
import { homePage } from "./home-page";
import { job } from "./job";
import { metals } from "./metals";
import { navbar } from "./navbar";
import { page } from "./page";
import { process } from "./process";
import { settings } from "./settings";
import { skills } from "../blocks/skills";
import { skillsList } from "../blocks/skillsList";
import { higherEducation } from "../blocks/higherEducation";
import { educationGroup } from "../blocks/educationGroup";
import { organization } from "./organization";

export const singletons = [homePage, blogIndex, settings, footer, navbar];

export const documents = [
  author,
  blog,
  categoryType,
  certificate,
  customer,
  job,
  metals,
  page,
  process,
  faq,
  skills,
  skillsList,
  organization,
  higherEducation,
  educationGroup,
  ...singletons,
];

