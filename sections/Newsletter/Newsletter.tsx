import { AppContext } from "../../apps/site.ts";
import Icon from "../../components/ui/Icon.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { useComponent } from "../Component.tsx";
import { type SectionProps } from "@deco/deco";
interface NoticeProps {
  title?: string;
  description?: string;
}
export interface Props {
  empty?: NoticeProps;
  success?: NoticeProps;
  failed?: NoticeProps;
  /** @description Signup label */
  label?: string;
  /** @description Input placeholder */
  placeholder?: string;
  /** @hide true */
  status?: "success" | "failed";
}
export async function action(props: Props, req: Request, ctx: AppContext) {
  const platform = usePlatform();
  const form = await req.formData();
  const email = `${form.get("email") ?? ""}`;
  if (platform === "vtex") {
    // deno-lint-ignore no-explicit-any
    await (ctx as any).invoke("vtex/actions/newsletter/subscribe.ts", {
      email,
    });
    return { ...props, status: "success" };
  }
  return { ...props, status: "failed" };
}
export function loader(props: Props) {
  return { ...props, status: undefined };
}
function Notice({ title, description }: {
  title?: string;
  description?: string;
}) {
  return (
    <div class="flex flex-col justify-center items-center sm:items-start gap-2 sm:gap-4">
      <span class="text-xl sm:text-2xl lg:text-3xl font-semibold text-center sm:text-start">
        {title}
      </span>
      <span class="text-xs sm:text-sm font-normal text-base-400 text-center sm:text-start">
        {description}
      </span>
    </div>
  );
}
function Newsletter({
  empty = {
    title: "Receba as melhores ofertas, últimas tendências e muito mais.",
    description:
      "Receba nossas novidades e promoções antecipadamente. Aproveite e ganhe 10% de desconto na sua primeira compra. Para mais informações clique aqui.",
  },
  success = {
    title: "Obrigado por se inscrever!",
    description:
      "Agora você está cadastrado para receber as últimas novidades, tendências e promoções exclusivas diretamente na sua caixa de entrada. Fique ligado!",
  },
  failed = {
    title: "Ops. Algo deu errado!",
    description:
      "Algo deu errado. Por favor, tente novamente. Se o problema persistir, entre em contato conosco.",
  },
  label = "Inscreva-se",
  placeholder = "Digite seu e-mail",
  status,
}: SectionProps<typeof loader, typeof action>) {
  if (status === "success" || status === "failed") {
    return (
      <Section.Container class="bg-base-200">
        <div class="p-6 sm:p-10 lg:p-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-10">
          <Icon
            size={60}
            class={clx(
              status === "success" ? "text-success" : "text-error",
              "sm:w-20 sm:h-20",
            )}
            id={status === "success" ? "check-circle" : "error"}
          />
          <Notice {...status === "success" ? success : failed} />
        </div>
      </Section.Container>
    );
  }
  return (
    <Section.Container class="bg-base-200 mx-2 max-w-fit">
      <div class="p-6 sm:p-10 lg:p-14 grid grid-flow-row sm:grid-cols-2 gap-6 sm:gap-10 lg:gap-20 place-items-center">
        <Notice {...empty} />

        <form
          hx-target="closest section"
          hx-swap="outerHTML"
          hx-post={useComponent(import.meta.url)}
          class="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full"
        >
          <input
            name="email"
            class="input input-bordered flex-grow text-sm sm:text-base"
            type="text"
            placeholder={placeholder}
          />

          <button class="btn btn-primary text-sm sm:text-base" type="submit">
            <span class="[.htmx-request_&]:hidden inline">
              {label}
            </span>
            <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
          </button>
        </form>
      </div>
    </Section.Container>
  );
}
export const LoadingFallback = () => <Section.Placeholder height="412px" />;
export default Newsletter;
