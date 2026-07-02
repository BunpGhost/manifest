import { createMemo, For, type Component } from 'solid-js';

interface TierBreakdownRow {
  tier: string;
  count: number;
  share_pct: number;
}

interface TierBreakdownChartProps {
  rows: TierBreakdownRow[];
}

const TIER_LABELS: Record<string, string> = {
  simple: 'Simple',
  standard: 'Standard',
  complex: 'Complex',
  reasoning: 'Reasoning',
};

const TIER_COLORS: string[] = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
];

const TIER_ORDER = ['simple', 'standard', 'complex', 'reasoning'];

const TierBreakdownChart: Component<TierBreakdownChartProps> = (props) => {
  const sortedRows = createMemo(() => {
    const map = new Map(props.rows.map((r) => [r.tier, r]));
    return TIER_ORDER.map((tier, i) => ({
      ...(map.get(tier) ?? { tier, count: 0, share_pct: 0 }),
      color: TIER_COLORS[i % TIER_COLORS.length],
      label: TIER_LABELS[tier] ?? tier,
    }));
  });

  const maxShare = createMemo(() => Math.max(...sortedRows().map((r) => r.share_pct), 1));

  return (
    <div class="panel" style="margin-top: var(--gap-lg);">
      <div class="panel__title">Requests by Tier</div>
      <p style="font-size: var(--font-size-xs); color: hsl(var(--muted-foreground)); margin: -8px 0 12px;">
        How requests are distributed across complexity tiers
      </p>
      <table class="data-table">
        <thead>
          <tr>
            <th>Tier</th>
            <th>Requests</th>
            <th>% of total</th>
          </tr>
        </thead>
        <tbody>
          <For each={sortedRows()}>
            {(row) => (
              <tr>
                <td style="font-weight: 500;">
                  <span style="display: inline-flex; align-items: center; gap: 8px;">
                    <span
                      style={`width: 10px; height: 10px; border-radius: 50%; background: ${row.color}; flex-shrink: 0;`}
                    />
                    {row.label}
                  </span>
                </td>
                <td>{row.count.toLocaleString()}</td>
                <td>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 60px; height: 6px; border-radius: 3px; background: hsl(var(--muted)); overflow: hidden;">
                      <div
                        style={`width: ${(row.share_pct / maxShare()) * 100}%; height: 100%; background: ${row.color}; border-radius: 3px;`}
                      />
                    </div>
                    <span style="font-size: var(--font-size-xs); color: hsl(var(--muted-foreground)); min-width: 36px;">
                      {Math.round(row.share_pct)}%
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};

export default TierBreakdownChart;
