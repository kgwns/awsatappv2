import { LabelTypeProp } from "../components/atoms/label/Label";

export interface TextWithFlagProps {
    title: string,
    titleColor?: string,
    barColor?: string,
    flag?: string,
    flagColor?: string,
    labelType?: LabelTypeProp,
    numberOfLines?: number,
}

export interface ShortArticleProps extends TextWithFlagProps {
    image: string
}

