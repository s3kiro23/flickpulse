import { useParams } from "next/navigation";
import { defaultLocale } from "@/utils/i18n";

export const useCurrentLanguage = () => {
    const params = useParams();

    return params.locale || defaultLocale;
}