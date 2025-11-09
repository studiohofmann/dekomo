import { defineQuery } from "next-sanity";

export const NAVIGATION_QUERY = defineQuery(`
  *[_type in ["homeSeite", "downloadsSeite", "kontaktSeite", "impressumSeite", "datenschutzSeite"]] {seitentitelMenue, slug, menuReihenfolge
  }
`);
export const HOME_QUERY = defineQuery(`*[_type == "homeSeite"][0]{
  sectionId,
  seoTitle,
  metaDescription,
  keywords,
  openGraphImage{
    asset->{
      _id,
      url,
      metadata{
        dimensions{
          width,
          height
        }
      }
    },
    alt
  },
  noIndex
}`);
export const EINLEITUNG_QUERY = defineQuery(`*[_type == "einleitung"][0]{
  sectionId,
  ueberschrift,
  text,
  bild{
    asset->{_id, url},
    alt
  },
}`);
export const PROJEKTBESCHREIBUNG_QUERY =
  defineQuery(`*[_type == "projektbeschreibung"][0]{
  sectionId,
  ueberschrift,
  text,
  grafik{
    asset->{_id, url},
    alt
  },
}`);
export const TEILPROJEKTE_QUERY = defineQuery(`*[_type == "teilprojekte"][0]{
  sectionId,
  ueberschrift,
  teilprojekt[] {
    ueberschrift,
    text
  }
}`);
export const AUSWIRKUNGEN_QUERY = defineQuery(`*[_type == "auswirkungen"][0]{
  sectionId,
  ueberschrift,
  text,
}`);
export const FALLBEISPIELE_QUERY = defineQuery(`*[_type == "fallbeispiele"][0]{
  sectionId,
  ueberschrift,
  fallbeispiel[]{
    ueberschrift,
    bild{
      asset->{_id, url},
      alt
    },
    text
  }
}`);
export const MEDIEN_QUERY = defineQuery(`*[_type == "medien"][0]{
  sectionId,
  ueberschrift,
  dateien[]{
    titel,
    typ,
    datei{
      asset->{
        url
      }
    },
    link
  }
}`);
export const NETZWERK_QUERY = defineQuery(`*[_type == "netzwerk"][0]{
  sectionId,
  ueberschrift,
  text,
  standorte[]{
    titel,
    latitude,
    longitude
  }
}`);
export const ZUGANGSWEGE_QUERY = defineQuery(`*[_type == "zugangswege"][0]{
  sectionId,
  ueberschrift,
  text, 
}`);
export const KOMPETENZERWEITERUNG_QUERY =
  defineQuery(`*[_type == "kompetenzerweiterung"][0]{
  sectionId,
  ueberschrift,
  text,
}`);

export const VISION_QUERY = defineQuery(`*[_type == "vision"][0]{
  sectionId,
  ueberschrift, text, grafik{
    asset->{_id, url},
    alt
  },
}`);
export const DOWNLOADS_SEITE_QUERY =
  defineQuery(`*[_type == "downloadsSeite"][0]{
    sectionId,
  seitentitelMenue,
  slug,
  text,
  dateien[]{
    titel,
    datei{
      asset->{
        _id,
        url,
        originalFilename,
        size,
        extension
      }
    }
  },
  seoTitle,
  metaDescription,
  keywords,
  openGraphImage{
    asset->{
      _id,
      url,
      metadata{
        dimensions{
          width,
          height
        }
      }
    },
    alt
  },
  noIndex
}`);
export const KONTAKT_SEITE_QUERY = defineQuery(`*[_type == "kontaktSeite"][0]{
  sectionId,
  seitentitelMenue,
  text,
  seoTitle,
  metaDescription,
  keywords,
  openGraphImage{
    asset->{
      _id,
      url,
      metadata{
        dimensions{
          width,
          height
        }
      }
    },
    alt
  },
  noIndex
}`);
export const ANSPRECHPERSONEN_QUERY =
  defineQuery(`*[_type == "ansprechpersonen"][0]{
  sectionId,
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
  sectionId,
  seitentitelMenue,
  angabenUeberschrift,
  angabenText,
  impressumText,
  seoTitle,
  metaDescription,
  keywords,
  openGraphImage{
    asset->{
      _id,
      url,
      metadata{
        dimensions{
          width,
          height
        }
      }
    },
    alt
  },
  noIndex
}`);
export const DATENSCHUTZ_QUERY = defineQuery(`*[_type == "datenschutz"][0]{
  sectionId,
  ueberschrift,
  text
}`);
export const PROJEKTFOERDERUNG_QUERY =
  defineQuery(`*[_type == "projektfoerderung"][0]{
  sectionId,
  ueberschrift,
  text,
  logo{
    asset->{_id, url},
    alt
  }
}`);
export const PROJEKTPARTNER_QUERY =
  defineQuery(`*[_type == "projektpartner"][0]{
  sectionId,
  ueberschrift,
  logos[]{
    asset->{_id, url},
    alt
  }
}`);
export const ERWEITERTES_NETZWERK_QUERY =
  defineQuery(`*[_type == "erweitertesNetzwerk"][0]{
  sectionId,
  ueberschrift,
  logos[]{
    asset->{_id, url},
    alt
  }
}`);
