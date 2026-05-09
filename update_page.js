const fs = require('fs');
const filePath = 'C:\\Users\\Django\\Desktop\\project\\firstOffer\\fatra-frontend\\app\\admin\\dashboard\\page.tsx';

let file = fs.readFileSync(filePath, 'utf8');

const imports = `
import { AdminSidebar } from "./components/AdminSidebar";
import { AdminHeader } from "./components/AdminHeader";
import { OverviewModule } from "./components/OverviewModule";
import { UserManagementModule } from "./components/UserManagementModule";
import { CourseAnalyticsModule } from "./components/CourseAnalyticsModule";
import { CoursesModule } from "./components/CoursesModule";
import { CategoriesModule } from "./components/CategoriesModule";
import { LiveSessionsModule } from "./components/LiveSessionsModule";
import { RevenueModule } from "./components/RevenueModule";
import { WithdrawalsModule } from "./components/WithdrawalsModule";
import { KnowledgeBaseModule } from "./components/KnowledgeBaseModule";
import { UserModals } from "./components/UserModals";
import { CourseModals } from "./components/CourseModals";
import { StreamModals } from "./components/StreamModals";
import { CategoryModals } from "./components/CategoryModals";
import { KnowledgeModals } from "./components/KnowledgeModals";
`;

// Insert imports after the last import line
const lines = file.split('\n');
const lastImportIndex = lines.reduce((acc, line, i) => line.startsWith('import ') ? i : acc, 0);

lines.splice(lastImportIndex + 1, 0, imports);

file = lines.join('\n');

const returnRegex = /  return \([\s\S]*?\n};\n\nexport default AdminDashboard;\s*$/;
const newReturn = `  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex">
      <AdminSidebar activeModule={activeModule} setActiveModule={setActiveModule} isCourseManagementOpen={isCourseManagementOpen} setIsCourseManagementOpen={setIsCourseManagementOpen} />

      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        <AdminHeader user={user} logout={logout} />

        <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
            >
              {activeModule === "overview" && <OverviewModule stats={stats} user={user} setActiveModule={setActiveModule} setRoleFilter={setRoleFilter} setUserTab={setUserTab} />}
              {activeModule === "course_analytics" && <CourseAnalyticsModule stats={stats} />}
              {activeModule === "users" && (
                <UserManagementModule 
                  stats={stats}
                  allUsers={allUsers}
                  userSearch={userSearch}
                  setUserSearch={setUserSearch}
                  roleFilter={roleFilter}
                  setRoleFilter={setRoleFilter}
                  userTab={userTab}
                  setUserTab={setUserTab}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  actionLoading={actionLoading}
                  handleInstructorAction={handleInstructorAction}
                  setShowAddModal={setShowAddModal}
                  setShowDetailModal={setShowDetailModal}
                  setUserDetail={setUserDetail}
                  setShowEditModal={setShowEditModal}
                  setEditUser={setEditUser}
                  handleDeleteUser={handleDeleteUser}
                  handleUpdateRole={handleUpdateRole}
                />
              )}
              {activeModule === "courses" && (
                <CoursesModule 
                  allCourses={allCourses}
                  courseSearch={courseSearch}
                  setCourseSearch={setCourseSearch}
                  courseTab={courseTab}
                  setCourseTab={setCourseTab}
                  coursePage={coursePage}
                  setCoursePage={setCoursePage}
                  courseItemsPerPage={courseItemsPerPage}
                  actionLoading={actionLoading}
                  setShowCourseModal={setShowCourseModal}
                  setShowInspectModal={setShowInspectModal}
                  setInspectCourse={setInspectCourse}
                  setEditCourseData={setEditCourseData}
                  handleCourseAction={handleCourseAction}
                  handleDeleteCourse={handleDeleteCourse}
                />
              )}
              {activeModule === "categories" && (
                <CategoriesModule 
                  categories={categories}
                  setShowAddCategoryModal={setShowAddCategoryModal}
                  setShowEditCategoryModal={setShowEditCategoryModal}
                  setEditCategory={setEditCategory}
                  handleDeleteCategory={handleDeleteCategory}
                />
              )}
              {activeModule === "live" && (
                <LiveSessionsModule 
                  liveStreams={liveStreams}
                  setShowAddStreamModal={setShowAddStreamModal}
                  setShowDuplicateModal={setShowDuplicateModal}
                  setSelectedStream={setSelectedStream}
                  setShowEditStreamModal={setShowEditStreamModal}
                  setEditStreamData={setEditStreamData}
                  handleDeleteStream={handleDeleteStream}
                  setShowAddSessionModal={setShowAddSessionModal}
                  setSelectedStreamForSession={setSelectedStreamForSession}
                />
              )}
              {activeModule === "revenue" && <RevenueModule stats={stats} />}
              {activeModule === "withdrawals" && (
                <WithdrawalsModule 
                  withdrawals={withdrawals}
                  handleApproveWithdrawal={handleApproveWithdrawal}
                />
              )}
              {activeModule === "knowledge" && (
                <KnowledgeBaseModule 
                  knowledgeDocs={knowledgeDocs}
                  knowledgeSearch={knowledgeSearch}
                  setKnowledgeSearch={setKnowledgeSearch}
                  setShowUploadModal={setShowUploadModal}
                  handleToggleDocument={handleToggleDocument}
                  handleDeleteDocument={handleDeleteDocument}
                  uploadLoading={uploadLoading}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <UserModals 
        showAddModal={showAddModal} setShowAddModal={setShowAddModal}
        newUser={newUser} setNewUser={setNewUser} handleAddUser={handleAddUser}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        editUser={editUser} setEditUser={setEditUser} handleEditSubmit={handleEditSubmit}
        showDetailModal={showDetailModal} setShowDetailModal={setShowDetailModal} userDetail={userDetail}
      />

      <CourseModals 
        showCourseModal={showCourseModal} setShowCourseModal={setShowCourseModal}
        editCourseData={editCourseData} setEditCourseData={setEditCourseData}
        newCourse={newCourse} setNewCourse={setNewCourse} handleCourseSubmit={handleCourseSubmit}
        allUsers={allUsers} categories={categories}
        showInspectModal={showInspectModal} setShowInspectModal={setShowInspectModal}
        inspectCourse={inspectCourse} handleCourseAction={handleCourseAction}
      />

      <StreamModals 
        showDuplicateModal={showDuplicateModal} setShowDuplicateModal={setShowDuplicateModal}
        selectedStream={selectedStream} duplicateInstructorId={duplicateInstructorId}
        setDuplicateInstructorId={setDuplicateInstructorId} handleDuplicateStream={handleDuplicateStream}
        showAddStreamModal={showAddStreamModal} setShowAddStreamModal={setShowAddStreamModal}
        newStream={newStream} setNewStream={setNewStream} handleCreateStream={handleCreateStream} allUsers={allUsers}
        showAddSessionModal={showAddSessionModal} setShowAddSessionModal={setShowAddSessionModal}
        selectedStreamForSession={selectedStreamForSession} newSession={newSession} setNewSession={setNewSession}
        handleCreateSession={handleCreateSession} showEditStreamModal={showEditStreamModal}
        setShowEditStreamModal={setShowEditStreamModal} editStreamData={editStreamData}
        setEditStreamData={setEditStreamData} handleEditStreamSubmit={handleEditStreamSubmit}
      />

      <CategoryModals 
        showAddCategoryModal={showAddCategoryModal} setShowAddCategoryModal={setShowAddCategoryModal}
        newCategory={newCategory} setNewCategory={setNewCategory} handleCreateCategory={handleCreateCategory}
        showEditCategoryModal={showEditCategoryModal} setShowEditCategoryModal={setShowEditCategoryModal}
        editCategory={editCategory} setEditCategory={setEditCategory} handleUpdateCategory={handleUpdateCategory}
      />

      <KnowledgeModals 
        showUploadModal={showUploadModal} setShowUploadModal={setShowUploadModal}
        uploadTitle={uploadTitle} setUploadTitle={setUploadTitle}
        uploadDescription={uploadDescription} setUploadDescription={setUploadDescription}
        handleUploadDocument={handleUploadDocument} setUploadFile={setUploadFile}
      />

    </div>
  );
};

export default AdminDashboard;
`;

file = file.replace(returnRegex, newReturn);
fs.writeFileSync(filePath, file);
console.log('Update complete!');
