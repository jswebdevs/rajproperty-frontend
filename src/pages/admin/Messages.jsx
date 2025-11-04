import React from "react";
import { useLoaderData } from "react-router-dom";

const Messages = () => {
  const messages = useLoaderData(); // expects an array of message objects

  return (
    <div className="px-[5%] py-8">
      <h2 className="text-3xl font-bold mb-8 text-cyan-600 dark:text-cyan-400">
        Contact Messages
      </h2>
      {messages && messages.length > 0 ? (
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow-lg">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-r border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                  Name
                </th>
                <th className="px-4 py-2 border-b border-r border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                  Phone
                </th>
                <th className="px-4 py-2 border-b border-r border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                  Email
                </th>
                <th className="px-4 py-2 border-b border-r border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                  Role
                </th>
                <th className="px-4 py-2 border-b border-r border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                  Property Type
                </th>
                <th className="px-4 py-2 border-b border-r border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                  Notes
                </th>
                <th className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, idx) => (
                <tr
                  key={msg._id || idx}
                  className={`transition-colors
                    ${
                      idx % 2 === 0
                        ? "bg-white dark:bg-gray-900"
                        : "bg-gray-50 dark:bg-gray-800"
                    }
                    hover:bg-blue-50 dark:hover:bg-cyan-900`}
                >
                  <td className="px-4 py-3 border-b border-r border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100">
                    {msg.name}
                  </td>
                  <td className="px-4 py-3 border-b border-r border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100">
                    {msg.phone}
                  </td>
                  <td className="px-4 py-3 border-b border-r border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100">
                    {msg.email}
                  </td>
                  <td className="px-4 py-3 border-b border-r border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100">
                    {msg.role}
                  </td>
                  <td className="px-4 py-3 border-b border-r border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100">
                    {msg.propertyType}
                  </td>
                  <td className="px-4 py-3 border-b border-r border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100">
                    {msg.notes}
                  </td>
                  <td className="px-4 py-3 border-b border-r border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100">
                    {msg.meta.entryDate
                      ? new Date(msg.meta.entryDate).toLocaleString()
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-6 text-xl text-gray-400 dark:text-gray-500 text-center">
          No messages found.
        </div>
      )}
    </div>
  );
};

export default Messages;
