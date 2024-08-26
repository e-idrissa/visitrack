import { columns } from '@/components/custom/tables/columns'
import { DataTable } from '@/components/custom/tables/data-table'
import { visitsList } from '@/data'
import React from 'react'

const AllVisits = () => {

  const visits = visitsList
  
  return (
    <main className="text-primary">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">All Visits</h2>
      </div>
      <DataTable columns={columns} data={visits} />
    </main>
  )
}

export default AllVisits