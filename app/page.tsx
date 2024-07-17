"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { Loader2, Printer } from "lucide-react";
import ReactToPrint from "react-to-print";

export default function Home() {
  const printRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const onBeforeGetContentResolve = useRef<(() => void) | null>(null); // Initialize with null

  const handleAfterPrint = useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = useCallback(() => {
    console.log("`onBeforePrint` called");
  }, []);

  const handleOnBeforeGetContent = useCallback(() => {
    console.log("`onBeforeGetContent` called");
    setLoading(true);

    return new Promise<void>((resolve) => {
      onBeforeGetContentResolve.current = resolve; // Type assertion
      setTimeout(() => {
        setLoading(false);
        resolve(); // Remove argument
      }, 2000);
    });
  }, [setLoading]);

  useEffect(() => {
    if (onBeforeGetContentResolve.current) {
      onBeforeGetContentResolve.current();
    }
  }, []); // Remove unnecessary dependency

  const reactToPrintContent = useCallback(() => {
    return printRef.current;
  }, []);

  const reactToPrintTrigger = useCallback(() => {
    return (
      <button className="flex items-center px-2 py-1 rounded-md bg-rose-500 text-white">
        {loading ? (
          <Loader2 className=" animate-spin size-4 mr-2" />
        ) : (
          <Printer className="size-4 mr-2" />
        )}
        Imprimer
      </button>
    );
  }, [loading]);

  return (
    <>
      {/* <style>
        {`
        @media print {
          table tbody tr:nth-of-type(8n){
            page-break-after: always;
          }
        }
      `}
      </style> */}
      <div>
        <ReactToPrint
          content={reactToPrintContent}
          documentTitle="AwesomeFileName"
          onAfterPrint={handleAfterPrint}
          onBeforeGetContent={handleOnBeforeGetContent}
          onBeforePrint={handleBeforePrint}
          removeAfterPrint
          trigger={reactToPrintTrigger}
          pageStyle={
            "@page { size: auto;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }"
          }
        />
      </div>

      <div ref={printRef}>
        {/* <img
          width={152}
          height={92}
          alt={"watermark"}
          src={"/watermark.png"}
          className="hidden top-[50vh] z-[-9] w-[50vw] left-[50%] -translate-x-1/2 -translate-y-1/2 opacity-[0.1] print:block fixed"
          style={{ pageBreakAfter: "always", counterIncrement: "page" }}
        /> */}

        <table className="w-full" style={{ pageBreakAfter: "always" }}>
          <thead style={{ display: "table-header-group" }}>
            <tr>
              <th className="px-4 py-3">Header</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <main className="px-3 bg-transparent">
                  <h1 className="text-center text-base font-semibold text-blue-400 mb-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Itaque, reprehenderit!
                  </h1>

                  <div className="flex flex-col gap-1 mb-5">
                    <div className="flex gap-1">
                      <span className="text-sm text-nowrap text-black font-semibold underline underline-offset-2 tracking-widest">
                        DEVIS N°:{" "}
                      </span>
                      <span className="text-sm font-semibold tracking-tighter no-underline underline-offset-0">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit
                      </span>
                    </div>

                    <div className="flex gap-1">
                      <span className="text-sm text-nowrap text-black font-semibold underline underline-offset-2 tracking-widest">
                        OBJET :{" "}
                      </span>
                      <span className="text-sm font-semibold tracking-tighter no-underline underline-offset-0">
                        Consectetur non pariatur magni explicabo voluptatem
                        delectus neque blanditiis. Similique, quos neque.
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-sm text-nowrap text-black font-semibold underline underline-offset-2 tracking-widest">
                        CLIENT :{" "}
                      </span>
                      <span className="text-sm font-semibold tracking-tighter no-underline underline-offset-0">
                        Lorem ipsum dolor sit amet.
                      </span>
                    </div>
                  </div>

                  <table className="border-collapse w-full">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b bg-[#BDD5ED]">
                        <th className="px-3 py-2 align-middle text-xs font-medium text-nowrap text-center text-black border border-black">
                          Art N°
                        </th>
                        <th className="px-3 py-2 align-middle text-xs font-medium text-nowrap text-center text-black border border-black">
                          Désignation
                        </th>
                        <th className="px-3 py-2 align-middle text-xs text-wrap font-medium text-center text-black border border-black">
                          Unité de mesure
                        </th>
                        <th className="px-3 py-2 align-middle text-xs font-medium text-wrap text-center text-black border border-black">
                          Quantité
                        </th>
                        <th className="px-3 py-2 align-middle text-xs font-medium text-wrap text-center text-black border border-black">
                          Prix unitaire en DH hors TVA
                        </th>
                        <th className="px-3 py-2 align-middle text-xs font-medium text-wrap text-center text-black border border-black">
                          Prix total en DH hors TVA
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {[...new Array(7)].map((_, i) => {
                        return (
                          <>
                            <tr key={i} className="border-b border-black">
                              <td className="align-middle text-center text-xs text-black font-medium p-2 border border-black">
                                1
                              </td>
                              <td className="align-middle p-2 border border-black">
                                <h3 className="text-base font-bold text-black">
                                  ECRAN TV LED 32 AVEC SUPPORT ET INSTALLATION
                                  MURAL
                                </h3>
                                <div>
                                  <span className="text-sm tracking-wide uppercase font-semibold block text-left text-nowrap underline underline-offset-2">
                                    Marque :&nbsp;
                                    <span className="font-medium text-black inline-block no-underline">
                                      ddddd
                                    </span>
                                  </span>
                                  <span className="text-sm tracking-wide uppercase font-semibold block text-left text-nowrap underline underline-offset-2">
                                    Origine :&nbsp;
                                    <span className="font-medium text-black inline-block no-underline">
                                      ddddd
                                    </span>
                                  </span>
                                  <span className="text-sm tracking-wide uppercase font-semibold block text-left text-nowrap underline underline-offset-2">
                                    Type :&nbsp;
                                    <span className="font-medium text-black inline-block no-underline">
                                      ddddd
                                    </span>
                                  </span>
                                  <span className="text-sm tracking-wide uppercase font-semibold block text-left text-nowrap underline underline-offset-2">
                                    Modèle :&nbsp;
                                    <span className="font-medium text-black inline-block no-underline">
                                      ddddd
                                    </span>
                                  </span>
                                  <span className="text-sm tracking-wide uppercase font-semibold block text-left text-nowrap underline underline-offset-2">
                                    Numéro de série :&nbsp;
                                    <span className="font-medium text-black inline-block no-underline">
                                      ddddd
                                    </span>
                                  </span>
                                  <span className="text-sm tracking-wide uppercase font-semibold block text-left text-nowrap underline underline-offset-2">
                                    Date d&apos;expiration :&nbsp;
                                    <span className="font-medium text-black inline-block no-underline">
                                      ddddd
                                    </span>
                                  </span>
                                </div>
                              </td>
                              <td className="align-middle text-center text-sm text-black font-medium p-2 border border-black">
                                Unité
                              </td>
                              <td className="align-middle text-center text-sm text-black font-medium p-2 border border-black">
                                49
                              </td>
                              <td className="align-middle text-center text-sm text-black font-medium p-2 border border-black">
                                3700
                              </td>
                              <td className="align-middle text-right text-sm text-black font-medium p-2 border border-black">
                                181,300.00
                              </td>
                            </tr>
                          </>
                        );
                      })}

                      <tr className="border-b bg-white border-black">
                        <td
                          colSpan={5}
                          className="align-middle text-center text-base text-black font-bold p-2 border border-black"
                        >
                          MONTANT TOTAL HT
                        </td>
                        <td className="align-middle text-right text-base text-black font-bold p-2 border border-black">
                          181,300.00
                        </td>
                      </tr>
                      <tr className="border-b bg-white border-black">
                        <td
                          colSpan={5}
                          className="align-middle text-center text-base text-black font-bold p-2 border border-black"
                        >
                          MONTANT TVA 20%
                        </td>
                        <td className="align-middle text-right text-base text-black font-bold p-2 border border-black">
                          181,300.00
                        </td>
                      </tr>
                      <tr className="border-b bg-white border-black">
                        <td
                          colSpan={5}
                          className="align-middle text-center text-base text-black font-bold p-2 border border-black"
                        >
                          MONTANT TOTAL TTC
                        </td>
                        <td className="align-middle text-right text-base text-black font-bold p-2 border border-black">
                          181,300.00
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="border-collapse w-full">
                    <tbody className="[&_tr:last-child]:border-0"></tbody>
                  </table>

                  <p className="text-center text-sm font-semibold text-black mt-8">
                    ARRETE LE PRESENT DEVIS A LA SOMME DE :
                  </p>
                </main>
              </td>
            </tr>
          </tbody>
          <tfoot style={{ display: "table-footer-group" }}>
            <tr>
              <td className="hidden print:block ">
                <div className="fixed bottom-0 w-full text-xs font-medium text-black text-center bg-white px-[72px] py-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Magnam labore, quidem quod porro ut sed itaque rem eveniet
                  illum, mollitia maiores, iure sequi. Repellat excepturi
                  delectus hic dolores ea ex numquam quasi sunt accusamus saepe
                  doloremque dicta omnis necessitatibus quaerat dignissimos
                  officiis, distinctio, molestiae voluptas asperiores iste,
                  illum assumenda itaque. Iure assumenda totam officia enim ex,
                  autem quidem aspernatur voluptatem quae earum eum illo
                  quisquam dignissimos, voluptate itaque! Veniam ipsam unde
                  obcaecati ipsa sint, nulla, est rerum quisquam quasi beatae
                  consequuntur odio, nostrum nisi atque reprehenderit officiis
                  fuga exercitationem quam impedit deleniti
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
