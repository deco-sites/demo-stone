import { type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";
import Section from "../../components/ui/Section.tsx";

/** @titleBy title */
interface Item {
  title: string;
  href: string;
}

/** @titleBy title */
interface Link extends Item {
  children: Item[];
}

/** @titleBy alt */
interface Social {
  alt?: string;
  href?: string;
  image: ImageWidget;
}

interface Props {
  links?: Link[];
  social?: Social[];
  paymentMethods?: Social[];
  policies?: Item[];
  logo?: ImageWidget;
  poweredDeco?: ImageWidget;
  trademark?: string;
}

function Footer({
  links = [],
  social = [],
  policies = [],
  paymentMethods = [],
  logo,
  poweredDeco,
  trademark,
}: Props) {
  return (
    <footer
      class="px-5 sm:px-0 mt-5 sm:mt-10"
      style={{ backgroundColor: "#004132" }}
    >
      <div class="container flex flex-col gap-5 sm:gap-10 py-10">
        <ul class="grid grid-flow-row sm:grid-flow-col gap-6 ">
          {links.map(({ title, href, children }) => (
            <li class="flex flex-col gap-4">
              <a class="text-base font-semibold text-white" href={href}>
                {title}
              </a>
              <ul class="flex flex-col gap-2">
                {children.map(({ title, href }) => (
                  <li>
                    <a
                      class="text-sm font-medium text-gray-300 hover:text-white"
                      href={href}
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div class="flex flex-col sm:flex-row gap-12 justify-between items-start sm:items-center">
          <ul class="flex gap-4">
            {social.map(({ image, href, alt }) => (
              <li>
                <a href={href}>
                  <Image
                    src={image}
                    alt={alt}
                    loading="lazy"
                    width={24}
                    height={24}
                  />
                </a>
              </li>
            ))}
          </ul>
          <ul class="flex flex-wrap gap-2">
            {paymentMethods.map(({ image, alt }) => (
              <li class="h-8 w-10 border border-gray-400 rounded flex justify-center items-center bg-white">
                <Image
                  src={image}
                  alt={alt}
                  width={20}
                  height={20}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>

        <hr class="w-full border-gray-400" />

        <div class="grid grid-flow-row sm:grid-flow-col gap-8">
          <ul class="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
            {policies.map(({ title, href }) => (
              <li>
                <a
                  class="text-xs font-medium text-gray-300 hover:text-white"
                  href={href}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>

          <div class="flex flex-nowrap items-center justify-between sm:justify-center gap-4">
            <div class="w-48">
              <img loading="lazy" src={logo} />
            </div>
            <span class="text-xs font-normal text-gray-300">{trademark}</span>
          </div>

          <div class="flex flex-nowrap items-center justify-center gap-4">
            <span class="text-sm font-normal text-gray-300">Powered by</span>
            <div class="w-24">
              <img loading="lazy" src={poweredDeco} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="1145px" />;

export default Footer;
