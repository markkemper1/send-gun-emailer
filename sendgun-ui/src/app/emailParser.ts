
export interface EmailParseResult {
    email: string;
    name: string;
}

export default function (value: string) : EmailParseResult  {

    const EMAIL_REGEXP : RegExp = /(?:"?([^"]*)"?\s)?(?:<?(.+@[^>]+)>?)/i;

    const isNameAndEmail = EMAIL_REGEXP.exec(value);

    const email = isNameAndEmail ? isNameAndEmail[2] : value;
    const name = isNameAndEmail ? isNameAndEmail[1] : null;

    return { email: email, name: name};
}
