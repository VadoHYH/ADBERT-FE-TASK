import ButtonGroupPanel from "@/components/ButtonGroupPanel";
import ChartPanel from '@/components/ChartPanel';

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>ADBERT 1.按鈕功能</h1>
      <br />
      <ButtonGroupPanel />
      <h1>ADBERT 2.圖表功能</h1>
      <br />
      <ChartPanel />
    </main>
  );
}
