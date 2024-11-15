"use client"

import { ArrowDown, ArrowUp, Download, Wallet } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="max-h-[80%] p-6 ml-64">
      <div className="mx-auto max-w-[1200px] space-y-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Total Certificates", value: "10511", change: "15%", up: true },
            { title: "Total Events", value: "100", change: "5%", up: false },
            { title: "Total Validations", value: "25000", change: "20%", up: true },
          ].map((metric) => (
            <div key={metric.title} className="p-4 rounded-lg shadow border">
              <div className="flex items-center justify-between pb-2">
                <h2 className="text-sm font-medium">{metric.title}</h2>
              </div>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className={`flex items-center text-sm ${metric.up ? "text-green-500" : "text-red-500"}`}>
                {metric.up ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                {metric.change} compared to last month
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-4 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">Recent Events</h2>
              <button className="text-sm text-gray-500 hover:text-gray-700">View all</button>
            </div>
            <div className="space-y-4 mt-4">
              {[
                { name: "Blockchain Summit 2024", date: "Mar 15, 2024", attendees: 250 },
                { name: "Web3 Developer Workshop", date: "Mar 10, 2024", attendees: 120 },
                { name: "NFT Conference", date: "Mar 5, 2024", attendees: 180 },
              ].map((event) => (
                <div key={event.name} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">{event.name}</h3>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                  <div className="text-sm text-gray-500">{event.attendees} attendees</div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">Recent Certificates</h2>
              <button className="text-sm text-gray-500 hover:text-gray-700">View all</button>
            </div>
            <div className="space-y-4 mt-4">
              {[
                { name: "Advanced Blockchain Development", recipient: "John Doe", date: "Mar 14, 2024" },
                { name: "Smart Contract Security", recipient: "Jane Smith", date: "Mar 13, 2024" },
                { name: "DeFi Fundamentals", recipient: "Alex Johnson", date: "Mar 12, 2024" },
              ].map((cert) => (
                <div key={cert.name} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">{cert.name}</h3>
                    <p className="text-sm text-gray-500">Issued to: {cert.recipient}</p>
                  </div>
                  <div className="text-sm text-gray-500">{cert.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
