import React from 'react';
import { DashboardTable } from "@components/molecules/dashboardItems/data-table";
import DynamicFormGenerator from "@components/molecules/form/dynamicForm";

/**
 * Common component for settings with a dynamic form and a data table.
 * @param {Object} props - Component props.
 * @param {Array} props.columns - Columns for the data table.
 * @param {Array} props.data - Data for the data table.
 * @param {string} props.tabName - Name of the tab.
 * @param {Object} props.form - Form configuration for DynamicFormGenerator.
 * @param {function} props.handleSubmit - Function to handle form submission.
 * @param {boolean} props.addElement - Flag to indicate whether to add an element.
 * @param {function} props.setAddElement - Function to set the addElement flag.
 * @param {boolean} props.editElement - Flag to indicate whether to edit an element.
 * @param {function} props.setEditElement - Function to set the editElement flag.
 * @param {Object} props.defaultValues - Default values for the form.
 * @param {boolean} props.hideButton - Flag to hide the button.
 */
export function SettingsCommon({
  columns,
  data,
  tabName,
  form,
  handleSubmit,
  addElement,
  setAddElement,
  editElement,
  setEditElement,
  defaultValues,
  hideButton
}: any) {
  return (
    <section>
      <section className="min-h-[45vh]">
        {/* Conditionally render either the data table or the dynamic form */}
        {!(addElement || editElement) ? (
          <div>
            <DashboardTable columns={columns} data={data ?? []} />
          </div>
        ) : (
          <section className="w-full md:w-[50%] my-10 relative">
            <DynamicFormGenerator
              defaultValues={editElement ? defaultValues : []}
              formProps={form}
              buttonText={editElement ? "Update" : "Submit"}
              handleSubmit={handleSubmit}
            />
          </section>
        )}
      </section>
      
      {/* Conditionally render the button section based on hideButton flag */}
      {!hideButton && (
        <section className="sm:w-[100%] w-screen flex justify-start">
          {/* Button to toggle addElement and editElement flags */}
          <button
            onClick={() => {
              setAddElement(!addElement);
              setEditElement(!editElement);
            }}
            className="bg-gray-200 p-2 rounded-md"
          >
            {!addElement ? "Add " + tabName : "View " + tabName}
          </button>
        </section>
      )}
    </section>
  );
}
