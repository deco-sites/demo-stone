import { type HTMLWidget, type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  title: string;
  description?: HTMLWidget;

  images: {
    mobile: ImageWidget;
    desktop: ImageWidget;
  };

  cta?: {
    href: string;
    label: string;
  };
}

function Banner({ title, description, images, cta }: Props) {
  return (
    <Section.Container>
      <div class="relative bg-base-200 rounded-[40px] mx-5 sm:mx-0">
        <Picture>
          <Source
            media="(max-width: 640px)"
            src={images.mobile}
            width={335}
            height={572}
          />
          <Source
            media="(min-width: 640px)"
            src={images.desktop}
            width={1320}
            height={480}
          />
          <img
            src={images.desktop}
            alt={title}
            class="w-full object-cover rounded-[40px]"
          />
        </Picture>

        <div
          class={clx(
            "absolute left-0 top-0",
            "p-6 sm:p-8 md:p-10 lg:py-20 lg:px-[60px]",
            "flex flex-col",
            "h-full max-w-full sm:max-w-[50%] md:max-w-[50%] justify-start sm:justify-center",
          )}
        >
          {title && (
            <span class="font-bold text-2xl sm:text-4xl md:text-5xl text-primary">
              {title}
            </span>
          )}
          {description && (
            <span
              class="font-normal text-xs sm:text-sm md:text-base pt-2 sm:pt-4 pb-6 sm:pb-12"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          <div class="">
            {cta && (
              <a
                href={cta.href}
                class="btn btn-primary no-animatio w-fit border-0 min-w-[120px] sm:min-w-[180px] text-sm sm:text-base"
              >
                {cta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </Section.Container>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;

export default Banner;
