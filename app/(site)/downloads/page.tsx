import { sanityFetch } from "@/sanity/lib/client";
import { DOWNLOADS_SEITE_QUERY } from "@/sanity/lib/queries";
import type { DOWNLOADS_SEITE_QUERYResult } from "@/sanity/types";
import { PortableText } from "next-sanity";
import { Button } from "@/components/ui/button";
import { DownloadOutlined, FileOutlined } from "@ant-design/icons";

export default async function DownloadsPage() {
  const downloadsSeite: DOWNLOADS_SEITE_QUERYResult = await sanityFetch({
    query: DOWNLOADS_SEITE_QUERY,
    revalidate: 60,
  });

  if (!downloadsSeite) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Downloads</h1>
        <p className="text-gray-600">Keine Downloads-Seite gefunden.</p>
      </div>
    );
  }

  // Helper function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="page-section">
      <section className="background-blue gap-8">
        <h2>{downloadsSeite.seitentitelMenue || "Downloads"}</h2>

        {downloadsSeite.text && (
          <div className="portable-text">
            <PortableText value={downloadsSeite.text} />
          </div>
        )}

        {/* Downloads section */}
        {downloadsSeite.dateien && downloadsSeite.dateien.length > 0 ? (
          <div className="grid gap-4">
            {downloadsSeite.dateien.map((item: any, index: number) => (
              <div key={index}>
                <div className="flex items-center justify-between bg-gray-100 text-gray-700 p-4 rounded-sm shadow-md border border-gray-700">
                  <div className="flex flex-col gap-2">
                    <div className="font-bold">{item.titel}</div>
                    {item.datei?.asset && (
                      <div className="flex text-sm gap-4 items-center justify-center">
                        <div className="flex items-center gap-2">
                          <FileOutlined className="text-lg pb-0.5" />
                          {item.datei.asset.originalFilename}
                        </div>

                        {item.datei.asset.size && (
                          <span>{formatFileSize(item.datei.asset.size)}</span>
                        )}
                      </div>
                    )}
                  </div>

                  {item.datei?.asset?.url && (
                    <div>
                      <a
                        href={item.datei.asset.url}
                        download={item.datei.asset.originalFilename}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="custom" size="custom">
                          <div className="flex gap-2 items-center justify-center">
                            <div>Download</div>

                            <DownloadOutlined className="text-lg pb-0.5" />
                          </div>
                        </Button>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Verfügbare Downloads</h2>
            <p className="text-gray-600">
              Derzeit sind keine Downloads verfügbar.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
