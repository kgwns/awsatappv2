import { LabelTypeProp } from "../components/atoms";
import { Styles } from "../shared/styles";
import { ShortArticleProps, TextWithFlagProps } from "./types";

export const sampleTextWithFlag: TextWithFlagProps = {
    title: ' يدمّر مسيّرتين بالأجواء اليمنية أُطلقت نحو المملكة',
    titleColor: Styles.color.davyGrey,
    barColor: Styles.color.greenishBlue,
    flag: 'آخر الأخبار',
    flagColor: Styles.color.darkSlateGray,
    labelType: LabelTypeProp.p5
}

export const shortArticleData: ShortArticleProps[] = [
    {
      image: 'https://picsum.photos/200/300',
      title: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
    },
    {
      image: 'https://picsum.photos/200/300',
      title: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
    },
    {
      image: 'https://picsum.photos/200/300',
      title: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
    },
    {
      image: 'https://picsum.photos/200/300',
      title: `لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار `,
    }
]

export const shortArticleWithTagData: ShortArticleProps[] = [
    {
      image: 'https://picsum.photos/200/300',
      title: 'ميقاتي: استقالة قرداحي كانت ضرورية',
      titleColor: Styles.color.black,
      flag: 'استنكار',
      flagColor: Styles.color.greenishBlue,
      barColor: Styles.color.greenishBlue,
      labelType: LabelTypeProp.h3
    },
    {
        image: 'https://picsum.photos/200/300',
        title: 'مواشنطن تعيد فتح ملف خاطفي الرهائن الأميركيين في بيروت',
        titleColor: Styles.color.black,
        flag: 'استنكار',
        flagColor: Styles.color.greenishBlue,
        barColor: Styles.color.greenishBlue,
        labelType: LabelTypeProp.h3
    },
    {
        image: 'https://picsum.photos/200/300',
        title: 'واشنطن تعيد فتح ملف خاطفي الرهائن الأميركيين في بيروت',
        titleColor: Styles.color.black,
        flag: 'استنكار',
        flagColor: Styles.color.greenishBlue,
        barColor: Styles.color.greenishBlue,
        labelType: LabelTypeProp.h3
    }
]