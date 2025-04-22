import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { 
  Search, 
  ChevronDown, 
  UserPlus, 
  Edit2, 
  Trash2, 
  MoreVertical,
  Filter,
  Download,
  RefreshCw,
  CheckCircle,
  X,
  Check,
  User,
  Calendar,
  ArrowUpDown,
  Shield,
  AlertCircle
} from 'lucide-react';

export default function Users({ auth, users }) {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  
  // Pagination settings
  const usersPerPage = 10;
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });
  
  // Paginate users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  
  // Handle sort click
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Handle select all users
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(currentUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };
  
  // Handle select individual user
  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };
  
  // Generate page numbers for pagination
  const pageNumbers = [];
  const maxPagesToShow = 5;
  
  if (totalPages <= maxPagesToShow) {
    // Show all pages if there are few
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Show first, last, and pages around current
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pageNumbers.unshift('...');
      pageNumbers.unshift(1);
    }
    
    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
  }

  // Function to get status badge styling based on role
  const getBadgeStyle = (role) => {
    switch(role) {
      case 'Admin':
        return 'bg-rose-50 text-rose-700 border border-rose-200';
      case 'Editor':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
  };

  return (
    <AdminLayout auth={auth}>
      <Head title="User Management" />

      <div className="py-4 px-4 sm:px-6 lg:px-8 max-w-full">
        {/* Dashboard card wrapper */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header section */}
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
                <p className="text-gray-500 mt-1">View and manage system users</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500 w-full sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                </div>
                
                {/* Filter button - functionality not implemented yet */}
                <button 
                  className="flex items-center justify-center px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors"
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                >
                  <Filter size={16} className="mr-2" />
                  Filter
                </button>
                
                {/* Add user button - functionality not implemented yet */}
                <button className="flex items-center justify-center px-4 py-2.5 bg-indigo-600 rounded-lg hover:bg-indigo-700 text-sm font-medium text-white transition-colors">
                  <UserPlus size={16} className="mr-2" />
                  Add User
                </button>
              </div>
            </div>
          </div>

          {/* Filter panel - not functional yet */}
          {showFilterPanel && (
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-700">Filter Options</h3>
                <button 
                  onClick={() => setShowFilterPanel(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Role filter - not functional yet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="User">User</option>
                  </select>
                </div>
                
                {/* Status filter - not functional yet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                
                {/* Date range filter - not functional yet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
                  <select className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Any time</option>
                    <option value="today">Today</option>
                    <option value="week">This week</option>
                    <option value="month">This month</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                {/* Filter action buttons - not functional yet */}
                <button className="px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
                  Reset
                </button>
                <button className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
          
          {/* Selected items actions toolbar */}
          {selectedUsers.length > 0 && (
            <div className="bg-indigo-50 p-4 border-y border-indigo-100 flex justify-between items-center">
              <div className="flex items-center">
                <CheckCircle size={16} className="text-indigo-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">{selectedUsers.length} users selected</span>
              </div>
              <div className="flex space-x-2">
                {/* Bulk action buttons - not functional yet */}
                <button className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  Export Selected
                </button>
                <button className="px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                  Assign Role
                </button>
                <button className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors">
                  Delete Selected
                </button>
              </div>
            </div>
          )}

          {/* Main table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="pl-6 py-3 w-12">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      onChange={handleSelectAll}
                      checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                    />
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center">
                      ID
                      <ArrowUpDown size={14} className={`ml-1 ${sortField === 'id' ? 'text-indigo-500' : 'text-gray-400'}`} />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      <User size={14} className="mr-1 text-gray-400" />
                      Name
                      <ArrowUpDown size={14} className={`ml-1 ${sortField === 'name' ? 'text-indigo-500' : 'text-gray-400'}`} />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center">
                      Email
                      <ArrowUpDown size={14} className={`ml-1 ${sortField === 'email' ? 'text-indigo-500' : 'text-gray-400'}`} />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1 text-gray-400" />
                      Last Login
                      <ArrowUpDown size={14} className={`ml-1 text-gray-400`} />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('role')}
                  >
                    <div className="flex items-center">
                      <Shield size={14} className="mr-1 text-gray-400" />
                      Role
                      <ArrowUpDown size={14} className={`ml-1 ${sortField === 'role' ? 'text-indigo-500' : 'text-gray-400'}`} />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="pl-6 py-4 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
                          <span>{user.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          {/* Status indicator - not functional yet */}
                          <div className="text-xs text-gray-500 flex items-center mt-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${Math.random() > 0.3 ? 'bg-green-500' : 'bg-gray-300'} mr-1.5`}></span>
                            {Math.random() > 0.3 ? 'Active' : 'Offline'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.last_login_at ? 
                        new Date(user.last_login_at).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 
                        'No record yet'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getBadgeStyle(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* User status indicators - not functional yet */}
                      <div className="flex space-x-1 text-xs">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100">
                          <Check size={10} className="mr-1" /> Email Verified
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end space-x-3">
                        {/* Action buttons - not fully functional yet */}
                        <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors">
                          <Trash2 size={16} />
                        </button>
                        <div className="relative group">
                          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                            <MoreVertical size={16} />
                          </button>
                          {/* Dropdown menu - not functional yet */}
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-30 hidden group-hover:block border border-gray-100">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View Details</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Reset Password</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Assign Role</a>
                            <hr className="my-1 border-gray-100" />
                            <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Deactivate</a>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* No results message */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-16 bg-white">
              <AlertCircle size={40} className="mx-auto text-gray-300" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No users found</h3>
              <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
              {/* Reset filters button - not functional yet */}
              <button className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <RefreshCw size={16} className="mr-2" />
                Reset filters
              </button>
            </div>
          )}
          
          {/* Footer with pagination and export */}
          {filteredUsers.length > 0 && (
            <div className="bg-white border-t border-gray-100 px-6 py-4">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
                  <span className="font-medium">
                    {indexOfLastUser > filteredUsers.length ? filteredUsers.length : indexOfLastUser}
                  </span>{" "}
                  of <span className="font-medium">{filteredUsers.length}</span> users
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Pagination controls */}
                  <button 
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    {pageNumbers.map((number, index) => (
                      <button
                        key={index}
                        onClick={() => typeof number === 'number' ? setCurrentPage(number) : null}
                        className={`relative inline-flex items-center px-4 py-2 border ${
                          currentPage === number
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-600 z-10'
                            : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                        } text-sm font-medium ${typeof number !== 'number' ? 'cursor-default' : ''}`}
                      >
                        {number}
                      </button>
                    ))}
                  </nav>
                  
                  <button 
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Export options - not functional yet */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {/* Data update timestamp - not functional yet */}
                Last updated: {new Date().toLocaleString()}
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Download size={16} className="mr-2" />
                Export Users
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}