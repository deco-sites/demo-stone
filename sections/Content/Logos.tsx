import { type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Section, {
  type Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";

export interface Image {
  image: ImageWidget;
  alt: string;
}

export interface Props extends SectionHeaderProps {
  images?: Image[];
}

function Logos({
  title,
  cta,
  images = [
    {
      alt: "deco",
      image:
        "https://decoims.com/demo-stone/d9696e0b-a87f-4bbc-ae29-7a5d51e964b2/ed85e01cae30b934.svg",
    },
    {
      alt: "deco",
      image:
        "https://decoims.com/demo-stone/edae0c0f-ae95-499b-9219-8f8992f8bfa8/7b89d6ef10a9ba1e.svg",
    },
  ],
}: Props) {
  return (
    <Section.Container>
      <Section.Header title={title} cta={cta} />

      <ul class="flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-5 sm:px-0">
        {images.map((item) => (
          <li>
            <Image
              width={300}
              height={300}
              src={item.image}
              alt={item.alt}
              class="w-full h-full object-cover"
            />
          </li>
        ))}
      </ul>
    </Section.Container>
  );
}

export default Logos;
