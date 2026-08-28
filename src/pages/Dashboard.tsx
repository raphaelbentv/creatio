import { Card, CardHeader } from '@/components/Card';
import { Gauge } from '@/components/Gauge';
import { Calendar } from '@/components/Calendar';
import { Checklist } from '@/components/Checklist';
import { StatsCard } from '@/components/StatsCard';
import { ProgressBar } from '@/components/ProgressBar';
import { Badge } from '@/components/Badge';
import { Chart } from '@/components/Chart';
import { Icon3D } from '@/components/Icon3D';
import { GraphLine } from '@/components/GraphLine';

export const Dashboard = () => {
  const checklistItems = [
    { id: '1', text: 'Finaliser le design système', checked: true },
    { id: '2', text: "Développer l'API Auth", checked: false },
    { id: '3', text: 'Tester le module paiement', checked: true },
    { id: '4', text: 'Optimiser les performances', checked: false },
    { id: '5', text: 'Déployer en production', checked: false },
    { id: '6', text: 'Documentation utilisateur', checked: false },
  ];

  const chartData = [60, 80, 45, 90, 70];

  const listItems = [
    { label: 'Mobile', sublabel: 'UI / UX Design' },
    { label: 'Marketing', sublabel: 'Campagnes' },
    { label: 'Onboarding', sublabel: 'Formation' },
    { label: 'Backend', sublabel: 'API Dev' },
    { label: 'Database', sublabel: 'Optimization' },
  ];

  return (
    <div className="shell py-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10">
          <h1 className="text-[32px] font-bold mb-2 text-ink">
            Dashboard Analytics
          </h1>
          <p className="text-ink-2 text-base font-normal">
            Vue d'ensemble de vos statistiques
          </p>
        </div>

        <h2 className="text-xl font-bold mb-6 text-ink">Dashboard Widgets</h2>

        <div className="grid grid-cols-6 gap-5 auto-rows-[160px] max-[1400px]:grid-cols-4 max-[1000px]:grid-cols-3 max-[700px]:grid-cols-2 max-[500px]:grid-cols-1 max-[500px]:auto-rows-auto">
          {/* Calendar Widget - Tiny */}
          <Card size="tiny">
            <Calendar compact />
          </Card>

          {/* Stats Card 1 - Tiny */}
          <Card size="tiny">
            <CardHeader title="Lundi" />
            <StatsCard value="40" label="Tâches" />
          </Card>

          {/* Stats Card 2 - Tiny */}
          <Card size="tiny">
            <CardHeader title="Mercredi" />
            <StatsCard value="68" label="Messages" />
          </Card>

          {/* Stats Card 3 - Tiny */}
          <Card size="tiny">
            <CardHeader title="Vendredi" />
            <StatsCard value="34" label="Réunions" />
          </Card>

          {/* Gauge Card - Square */}
          <Card size="square">
            <CardHeader title="Performance" />
            <Gauge value={67} />
          </Card>

          {/* Progress Card - Square */}
          <Card size="square">
            <CardHeader title="En cours" />
            <Icon3D>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </Icon3D>
            <div className="text-[15px] font-bold text-ink mb-1">
              Arrow SaaS
            </div>
            <div className="text-xs text-ink-3 font-medium mb-4">
              Platform Dev
            </div>
            <ProgressBar value={73} />
          </Card>

          {/* Huge Calendar */}
          <Card size="huge">
            <CardHeader title="Novembre 2025" />
            <Calendar />
          </Card>

          {/* Checklist Card - Tall */}
          <Card size="tall">
            <CardHeader title="Tasks" />
            <Checklist items={checklistItems} />
          </Card>

          {/* Labels Card - Tall */}
          <Card size="tall">
            <CardHeader title="Labels" />
            <div className="flex flex-col gap-2.5">
              {listItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-surface-soft rounded-[14px] transition-all duration-300 border border-line hover:bg-brand-soft hover:translate-x-1 hover:border-brand"
                >
                  <div>
                    <div className="text-[15px] font-bold text-ink">
                      {item.label}
                    </div>
                    <div className="text-xs text-ink-3 mt-1 font-medium">
                      {item.sublabel}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Chart Card - Square */}
          <Card size="square">
            <CardHeader title="Charts" />
            <Badge>📊 Stats</Badge>
            <Chart data={chartData} />
          </Card>

          {/* Users Card - Square */}
          <Card size="square">
            <CardHeader title="Équipe" />
            <div className="flex items-center mb-5">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-[3px] border-surface -ml-4 first:ml-0 overflow-hidden transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative z-10"
                >
                  <div className="w-full h-full bg-brand" />
                </div>
              ))}
            </div>
            <StatsCard value="3,875" label="Utilisateurs" />
          </Card>

          {/* Graph Card - Square */}
          <Card size="square">
            <CardHeader title="Tendance" />
            <StatsCard value="240" label="Total Left" />
            <GraphLine />
          </Card>

          {/* Time Card - Tiny */}
          <Card size="tiny">
            <CardHeader title="Mardi" />
            <StatsCard value="21" label="Nov" />
          </Card>

          {/* Metric Card - Tiny */}
          <Card size="tiny">
            <CardHeader title="Revenue" />
            <StatsCard value="2.4k" label="€ / mois" />
          </Card>
        </div>
      </div>
    </div>
  );
};
