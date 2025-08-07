export async function GET() {
  try {
    const res = await fetch("https://opendata.cwa.gov.tw/api/v1/rest/datastore/C-B0025-001?Authorization=CWA-22D160B2-9A27-4A4E-A7CA-D71245652694&format=JSON&DataType=stationObsTimes")

    // 顯示回應狀態
    console.log("CWB 回應狀態碼：", res.status)

    if (!res.ok) {
      const text = await res.text()
      console.error("CWB API 錯誤回應：", text)
      return new Response(JSON.stringify({ error: "氣象局 API 回應失敗", detail: text }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      })
    }

    const data = await res.json()
    return Response.json(data)
  } catch (err) {
    console.error("API Proxy 發生錯誤:", err)
    return new Response(JSON.stringify({ error: "內部錯誤", detail: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}