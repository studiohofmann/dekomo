import { sanityFetch } from "@/sanity/lib/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  const results = await sanityFetch({
    query: `*[
      (
        defined(seitentitelMenue) && seitentitelMenue match $q + "*" ||
        defined(seoTitle) && seoTitle match $q + "*" ||
        defined(metaDescription) && metaDescription match $q + "*" ||
        defined(ueberschrift) && ueberschrift match $q + "*" ||
        $q in keywords ||
        defined(text) && text[].children[].text match $q + "*" ||
        defined(angabenText) && angabenText[].children[].text match $q + "*" ||
        defined(impressumText) && impressumText[].children[].text match $q + "*" ||
        defined(ansprechperson) && ansprechperson[].text[].children[].text match $q + "*"
      )
    ][0...10]{
      _id,
      _type,
      seitentitelMenue,
      seoTitle,
      metaDescription,
      ueberschrift,
      keywords,
      slug,
      text,
      angabenText,
      impressumText,
      ansprechperson
    }`,
    params: { q },
  });

  return Response.json(results);
}
