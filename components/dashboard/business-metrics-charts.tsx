"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  CardContent,
  CardHeader,
  CardTitle,
  CardWrapper,
} from "@/components/shared";
import type { DashboardDistributionDatum, DashboardTrendDatum } from "@/types";

type BusinessMetricsChartsProps = {
  priorityDistribution: DashboardDistributionDatum[];
  channelDistribution: DashboardDistributionDatum[];
  sentimentDistribution: DashboardDistributionDatum[];
  conversationTrend: DashboardTrendDatum[];
};

const priorityColors = [
  "var(--telosa-red)",
  "var(--telosa-orange)",
  "var(--telosa-blue)",
  "var(--telosa-gray)",
];

const channelColors = [
  "var(--telosa-blue)",
  "var(--telosa-green)",
  "var(--telosa-purple)",
  "var(--telosa-orange)",
];

const axisTick = {
  fill: "var(--muted-foreground)",
  fontSize: 11,
};

const tooltipStyle = {
  border: "1px solid var(--border)",
  borderRadius: "10px",
  background: "var(--card)",
  boxShadow: "var(--shadow-elevated)",
  fontSize: "12px",
};

export function ChannelDistributionCard({
  data,
  total,
}: {
  data: DashboardDistributionDatum[];
  total: number;
}) {
  const chartTotal =
    total > 0 ? total : data.reduce((sum, item) => sum + item.value, 0);

  return (
    <CardWrapper className="min-w-0 gap-0 overflow-hidden py-0">
      <CardHeader className="border-border flex-row items-center justify-between border-b px-4 py-3">
        <CardTitle className="text-sm font-semibold">
          Conversations by Channel
        </CardTitle>
        <span className="text-telosa-blue text-[11px] font-semibold">
          Live mix
        </span>
      </CardHeader>
      <CardContent className="grid h-40 items-center gap-2 p-2 sm:grid-cols-[minmax(8rem,0.9fr)_minmax(10rem,1.1fr)]">
        <div
          className="relative h-32 min-w-0"
          role="img"
          aria-label="Donut chart showing conversation channel distribution"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={43}
                outerRadius={63}
                paddingAngle={2}
                cornerRadius={3}
                animationDuration={700}
                stroke="var(--card)"
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={channelColors[index % channelColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold tabular-nums">
              {chartTotal.toLocaleString()}
            </span>
            <span className="text-muted-foreground text-[9px] uppercase">
              Total
            </span>
          </div>
        </div>
        <ul className="space-y-2">
          {data.slice(0, 5).map((entry, index) => {
            const percentage =
              chartTotal > 0 ? Math.round((entry.value / chartTotal) * 100) : 0;
            return (
              <li
                key={entry.name}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 text-[10px]"
              >
                <span
                  className="size-2 rounded-full"
                  style={{
                    background: channelColors[index % channelColors.length],
                  }}
                  aria-hidden
                />
                <span className="text-muted-foreground truncate">
                  {entry.name}
                </span>
                <span className="font-medium tabular-nums">
                  {entry.value.toLocaleString()}{" "}
                  <span className="text-muted-foreground">({percentage}%)</span>
                </span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </CardWrapper>
  );
}

export function BusinessMetricsCharts({
  priorityDistribution,
  channelDistribution,
  sentimentDistribution,
  conversationTrend,
}: BusinessMetricsChartsProps) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <ChartCard title="Priority Distribution">
        <div
          className="h-64 w-full"
          role="img"
          aria-label="Bar chart showing conversation priority distribution"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priorityDistribution} margin={{ top: 8 }}>
              <CartesianGrid
                stroke="var(--border)"
                strokeDasharray="3 5"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={axisTick}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={axisTick}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: "var(--muted)", opacity: 0.55 }}
                contentStyle={tooltipStyle}
              />
              <Bar
                dataKey="value"
                name="Conversations"
                radius={[6, 6, 2, 2]}
                animationDuration={650}
              >
                {priorityDistribution.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={priorityColors[index % priorityColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Channel Distribution">
        <div
          className="h-64 w-full"
          role="img"
          aria-label="Pie chart showing conversation channel distribution"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={channelDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={48}
                outerRadius={78}
                paddingAngle={3}
                cornerRadius={5}
                animationDuration={700}
              >
                {channelDistribution.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={channelColors[index % channelColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend
                iconType="circle"
                iconSize={7}
                wrapperStyle={{
                  fontSize: 11,
                  color: "var(--muted-foreground)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Conversation Trend">
        <div
          className="h-64 w-full"
          role="img"
          aria-label="Line chart showing total and critical conversation trend"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={conversationTrend}>
              <CartesianGrid
                stroke="var(--border)"
                strokeDasharray="3 5"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={axisTick}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={axisTick}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend
                iconType="circle"
                iconSize={7}
                wrapperStyle={{
                  fontSize: 11,
                  color: "var(--muted-foreground)",
                }}
              />
              <Line
                type="monotone"
                dataKey="conversations"
                name="Conversations"
                stroke="var(--telosa-blue)"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5, strokeWidth: 2 }}
                animationDuration={700}
              />
              <Line
                type="monotone"
                dataKey="critical"
                name="Critical"
                stroke="var(--telosa-red)"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5, strokeWidth: 2 }}
                animationDuration={700}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Sentiment Distribution">
        <div
          className="h-64 w-full"
          role="img"
          aria-label="Bar chart showing conversation sentiment distribution"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sentimentDistribution} layout="vertical">
              <CartesianGrid
                stroke="var(--border)"
                strokeDasharray="3 5"
                horizontal={false}
              />
              <XAxis
                type="number"
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={axisTick}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={104}
                tickLine={false}
                axisLine={false}
                tick={axisTick}
              />
              <Tooltip
                cursor={{ fill: "var(--muted)", opacity: 0.55 }}
                contentStyle={tooltipStyle}
              />
              <Bar
                dataKey="value"
                name="Conversations"
                fill="var(--telosa-purple)"
                radius={[0, 5, 5, 0]}
                animationDuration={700}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <CardWrapper className="min-w-0 overflow-hidden">
      <CardHeader className="border-border/60 border-b pb-3">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="min-w-0">{children}</CardContent>
    </CardWrapper>
  );
}
