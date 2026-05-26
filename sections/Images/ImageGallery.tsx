import { type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section, {
  type Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";
import { type LoadingFallbackProps } from "@deco/deco";
/**
 * @titleBy alt
 */
interface Banner {
  mobile: ImageWidget;
  desktop?: ImageWidget;
  /** @description Image alt texts */
  alt: string;
  /** @description Adicione um link */
  href: string;
}
interface Props extends SectionHeaderProps {
  /**
   * @maxItems 4
   * @minItems 4
   */
  banners?: Banner[];
}
function Banner({ mobile, desktop, alt, href }: Banner) {
  return (
    <a href={href} class="overflow-hidden">
      <Picture>
        <Source
          width={190}
          height={190}
          media="(max-width: 767px)"
          src={mobile}
        />
        <Source
          width={640}
          height={420}
          media="(min-width: 768px)"
          src={desktop || mobile}
        />
        <img
          width={640}
          class="w-full h-full object-cover"
          src={mobile}
          alt={alt}
          decoding="async"
          loading="lazy"
        />
      </Picture>
    </a>
  );
}
function Gallery({
  title,
  cta,
  banners = [
    {
      mobile:
        "https://decoims.com/demo-stone/c6cc1e2a-1eff-43ea-8cad-e37afa9f7362/b00140565292e994.jpg",
      desktop:
        "https://decoims.com/demo-stone/c6cc1e2a-1eff-43ea-8cad-e37afa9f7362/b00140565292e994.jpg",
      alt: "Fashion",
      href: "/",
    },
    {
      alt: "Fashion",
      href: "/",
      mobile:
        "https://decoims.com/demo-stone/d009a600-7555-48ef-8b81-5f1b1afee857/5a74f902da0bc031.jpg",
      desktop:
        "https://decoims.com/demo-stone/d009a600-7555-48ef-8b81-5f1b1afee857/5a74f902da0bc031.jpg",
    },
    {
      mobile:
        "https://decoims.com/demo-stone/2c0d54cf-08a3-4a9e-bdcc-6501d4187f00/22f0a68a97a32230.jpg",
      desktop:
        "https://decoims.com/demo-stone/2c0d54cf-08a3-4a9e-bdcc-6501d4187f00/22f0a68a97a32230.jpg",
      href: "/",
      alt: "Fashion",
    },
    {
      mobile:
        "https://decoims.com/demo-stone/3553c1ed-003f-4d35-a2e0-2807d53ff65f/aa22385caef90351.jpg",
      desktop:
        "https://decoims.com/demo-stone/3553c1ed-003f-4d35-a2e0-2807d53ff65f/aa22385caef90351.jpg",
      alt: "Fashion",
      href: "/",
    },
  ],
}: Props) {
  return (
    <Section.Container>
      <Section.Header title={title} cta={cta} />

      <ul class="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 px-5 sm:px-0">
        {banners.map((item) => (
          <li>
            <Banner {...item} />
          </li>
        ))}
      </ul>
    </Section.Container>
  );
}
export const LoadingFallback = (
  { title, cta }: LoadingFallbackProps<Props>,
) => (
  <Section.Container>
    <Section.Header title={title} cta={cta} />

    <Section.Placeholder height="635px" />;
  </Section.Container>
);
export default Gallery;
