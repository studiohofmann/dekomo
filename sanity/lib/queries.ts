import { defineQuery } from "next-sanity";

export const NAVIGATION_QUERY = defineQuery(`
  *[_type in ["homeSeite", "kontaktSeite", "impressumSeite", "datenschutzSeite"]] {seitentitelMenue, slug, menuReihenfolge
  }
`);

export const HOME_QUERY = defineQuery(`*[_type == "homeSeite"][0]{
  seitentitelMenue, slug
}`);

export const EINLEITUNG_QUERY = defineQuery(`*[_type == "einleitung"][0]{
  ueberschrift
}`);

export const VISION_QUERY = defineQuery(`*[_type == "vision"][0]{
  ueberschrift, text
}`);

export const PROJEKTBESCHREIBUNG_QUERY =
  defineQuery(`*[_type == "projektbeschreibung"][0]{
  ueberschrift,
  text,
  grafik{
    asset->{_id, url},
    alt
  },
}`);
export const TEILPROJEKTE_QUERY = defineQuery(`*[_type == "teilprojekte"]{
  ueberschrift,
  text,
}`);

export const ZUGANGSWEGE_QUERY = defineQuery(`*[_type == "zugangswege"][0]{
  ueberschrift,
  grafik{
    asset->{
      _id,
      url
    },
    alt
  }
}`);
export const AUSWIRKUNGEN_QUERY = defineQuery(`*[_type == "auswirkungen"][0]{
  ueberschrift,
  grafik{
    asset->{
      _id,
      url
    },
    alt
  }
}`);
export const NETZWERK_QUERY = defineQuery(`*[_type == "netzwerk"][0]{
  ueberschrift,
  text,
  standorte[]{
    titel,
    latitude,
    longitude
  }
}`);

export const KONTAKT_SEITE_QUERY = defineQuery(`*[_type == "kontaktSeite"][0]{
 seitentitelMenue, text, ueberschriftAnsprechpersonen, textAnsprechpersonen
}`);

export const ANSPRECHPERSONEN_QUERY =
  defineQuery(`*[_type == "ansprechpersonen"][0]{
  ueberschrift,
  ansprechperson[]{
    text,
    profilbild{
      asset->{
        _id,
        url
      },
      alt
    }
  }
}`);

export const IMPRESSUM_SEITE_QUERY =
  defineQuery(`*[_type == "impressumSeite"][0]{
 seitentitelMenue, angabenText, impressumText,
}`);

export const DATENSCHUTZ_SEITE_QUERY =
  defineQuery(`*[_type == "datenschutzSeite"][0]{
 seitentitelMenue, text,
}`);

export const FOOTER_QUERY = defineQuery(`*[_type == "footer"][0]{
  partner,
  netzwerk,
  partnerLogos[]{
    asset->{_id, url},
    alt,
    name,
    url
  },
  netzwerkLogos[]{
    asset->{_id, url},
    alt,
    name,
    url
  }
}`);
