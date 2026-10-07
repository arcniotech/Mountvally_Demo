import React, { useState } from 'react';
import {
  Bus,
  Package,
  Image as ImageIcon,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  Phone,
  Layers,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Tabs } from '../../components/common/Tabs';
import { Badge } from '../../components/common/Badge';

export function OperationsPage() {
  const { transport, inventory } = useData();
  const { showSuccess } = useToast();
  const [activeTab, setActiveTab] = useState('Transport');

  const tabs = [
    { id: 'Transport', label: 'Fleet & Transport' },
    { id: 'Inventory', label: 'Inventory & Assets' },
    { id: 'Gallery', label: 'School Media Gallery' },
  ];

  const galleryAlbums = [
    { title: 'Annual Day Celebrations 2026', count: '48 Photos', cover: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80' },
    { title: 'Inter-School Sports Meet', count: '72 Photos', cover: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80' },
    { title: 'Science Innovation Fair', count: '35 Photos', cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80' },
    { title: 'Classroom & Laboratory Life', count: '60 Photos', cover: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="School Operations"
        subtitle="Manage transport bus fleets, inventory asset procurement, and media archives"
        showAccent={true}
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Transport Tab */}
      {activeTab === 'Transport' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {transport.map((bus) => (
              <div key={bus.id} className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-teal-600 text-sm">{bus.busNo}</span>
                    <Badge variant="active" size="sm">{bus.status}</Badge>
                  </div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-2">{bus.routeName}</h4>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs space-y-1 text-slate-600 dark:text-slate-300">
                    <div className="flex justify-between"><span>Driver:</span><strong>{bus.driverName}</strong></div>
                    <div className="flex justify-between"><span>Contact:</span><span className="font-mono text-teal-600">{bus.driverPhone}</span></div>
                    <div className="flex justify-between"><span>Capacity:</span><span>{bus.occupied} / {bus.capacity} Seats</span></div>
                  </div>
                </div>
                <div className="pt-3 mt-3 border-t flex justify-end">
                  <button
                    onClick={() => showSuccess(`Live GPS tracking for ${bus.busNo} initiated.`)}
                    className="px-3.5 py-1.5 bg-teal-600 text-white font-bold text-xs rounded-xl shadow-sm"
                  >
                    Track Live Route
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Tab */}
      {activeTab === 'Inventory' && (
        <div className="bg-white dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase">
                  <th className="p-3.5">Asset / Item Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Available Stock</th>
                  <th className="p-3.5">Unit</th>
                  <th className="p-3.5">Min Threshold</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {inventory.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-bold text-slate-800 dark:text-white">{inv.itemName}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{inv.category}</td>
                    <td className="p-3.5 font-mono font-bold">{inv.quantity}</td>
                    <td className="p-3.5 text-slate-500">{inv.unit}</td>
                    <td className="p-3.5 font-mono text-slate-400">{inv.minThreshold}</td>
                    <td className="p-3.5">
                      <Badge variant={inv.status === 'In Stock' ? 'active' : inv.status === 'Low Stock' ? 'pending' : 'danger'} size="sm">
                        {inv.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Gallery Tab */}
      {activeTab === 'Gallery' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
          {galleryAlbums.map((alb) => (
            <div key={alb.title} className="rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden group cursor-pointer">
              <div className="h-44 overflow-hidden relative">
                <img src={alb.cover} alt={alb.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-[10px] font-bold">
                  {alb.count}
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-sm text-slate-800 dark:text-white">{alb.title}</h4>
                <p className="text-xs text-slate-400 mt-1">Campus Life &bull; 2026 Archive</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
