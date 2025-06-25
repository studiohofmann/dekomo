import { defineQuery } from "next-sanity";

export const NAVIGATION_QUERY = defineQuery(`
  *[_type in ["homeSeite", "kontaktSeite", "impressumSeite"]] {seitentitelMenue, slug, menuReihenfolge
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
    asset->{
      _id,
      url
    },
    alt
  },
  zusatzinfos{
    grafik{
      asset->{
        _id,
        url
      },
      alt
    },
    text
  },
  teilprojekte[]{
    ueberschrift,
    text,
    grafik{
      asset->{
        _id,
        url
      },
      alt
    }
  }
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
export const NETZWERKKARTE_QUERY = defineQuery(`*[_type == "netzwerkkarte"][0]{
  ueberschrift,
  text,
  standorte[]{
    titel,
    coordinates
  }
}`);

export const KONTAKT_SEITE_QUERY = defineQuery(`*[_type == "kontaktSeite"][0]{
 seitentitelMenue, text, ueberschriftAnsprechpersonen, textAnsprechpersonen
}`);

export const IMPRESSUM_SEITE_QUERY =
  defineQuery(`*[_type == "impressumSeite"][0]{
 seitentitelMenue, angabenText, impressumText,
}`);

export const FOOTER_QUERY = defineQuery(`*[_type == "footer"][0]{
  partner, netzwerk
}`);
