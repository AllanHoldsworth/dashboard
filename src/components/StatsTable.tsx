import { useState } from 'react';
import { statsMock } from '../mock/stats';
import clsx from 'clsx';
import { calculateDiff, formatNumber } from '../utils/formatters';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StatsChart from './Chart';

const StatsTable = () => {
  const [activeRowId, setActiveRowId] = useState<string | null>(null);

  const handleRowClick = (id: string) => {
    setActiveRowId(prev => prev === id ? null : id);
  }

  const baseCellClasses = "p-4 border-b-4 border-white last:border-r-0 border-r-4 transition-colors";

  return (
    <div className="w-full overflow-x-auto">
      <table className='w-full border-collapse text-sm text-gray-500 font-medium'>
        <thead>
          <tr className='text-center text-gray-700'>
            <th className={`${baseCellClasses} font-medium bg-neutral-100`}>Показатель</th>
            <th className={`${baseCellClasses} bg-blue-100/60 font-medium`}>Текущий день</th>
            <th className={`${baseCellClasses} font-medium bg-neutral-100`}>Вчера</th>
            <th className={`${baseCellClasses} font-medium bg-neutral-100`}>Этот день недели</th>
          </tr>
        </thead>
        <tbody>
          {
            statsMock.map(row => {
              const todayDiff = calculateDiff(row.current, row.yesterday);
              const weekdayDiff = calculateDiff(row.current, row.weekday);
              const isActive = row.id === activeRowId;

              return (
                <React.Fragment key={row.id}>
                  <tr
                    onClick={() => handleRowClick(row.id)}
                    className='cursor-pointer group'
                  >
                    <td className={`${baseCellClasses} bg-neutral-100 group-hover:bg-neutral-200`}>
                      {row.label}
                    </td>

                    <td className={`${baseCellClasses} text-right bg-blue-100/60 group-hover:bg-blue-200/60`}>
                      {formatNumber(row.current)}
                    </td>

                    <td className={clsx(
                      baseCellClasses,
                      'text-right',
                      todayDiff > 0 && 'bg-green-100 group-hover:bg-green-200',
                      todayDiff < 0 && 'bg-red-100 group-hover:bg-red-200',
                      todayDiff === 0 && 'bg-neutral-100 group-hover:bg-neutral-200'
                    )}>
                      {formatNumber(row.yesterday)}
                      <span className={clsx(
                        'inline-block ml-3 text-xs font-bold px-1.5 py-0.5 rounded',
                        todayDiff < 0 && 'text-red-700',
                        todayDiff >= 0 && 'text-green-700',
                      )}>
                        {todayDiff}%
                      </span>
                    </td>

                    <td className={clsx(
                      baseCellClasses,
                      'text-right',
                      weekdayDiff > 0 && 'bg-green-100 group-hover:bg-green-200',
                      weekdayDiff < 0 && 'bg-red-100 group-hover:bg-red-200',
                      weekdayDiff === 0 && 'bg-neutral-100 group-hover:bg-neutral-200'
                    )}>
                      {formatNumber(row.weekday)}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={4} className="p-0 border-0">
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden bg-white"
                          >
                            <div className="p-4 border-b-4 border-white">
                              <StatsChart data={row.chartData} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </tr>
                </React.Fragment>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default StatsTable;