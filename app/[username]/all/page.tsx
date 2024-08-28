import { columns } from '@/components/custom/tables/columns'
import { DataTable } from '@/components/custom/tables/data-table'
import { GetVisits } from '@/lib/actions/visit.actions'
import React from 'react'

const AllVisits = async () => {

  const visits = await GetVisits();
  
  return (
    <main className="text-primary">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-medium">All Visits</h2>
      </div>
      <DataTable columns={columns} data={visits!} />
    </main>
  )
}

export default AllVisits