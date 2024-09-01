export function removeBranchById(record, selectedDc, branchIdToRemove) {
  // Iterate over each diagnostic center

  const updatedDiagnosticCenters = record?.diagnosticCenters
    ?.map((center) => {
      if (center?.diagnostic === selectedDc) {
        const updatedBranches = center?.branches?.filter(
          (branch) => branch?.branchId !== branchIdToRemove,
        );
        return { ...center, branches: updatedBranches };
      }
      return center;
    })
    .filter((center) => center.branches.length > 0);

  return updatedDiagnosticCenters;
}

export function getRoleNameByBranchId(users, branchIdToFind) {
  for (const user of users) {
    for (const center of user?.diagnosticCenters || []) {
      // Iterate over each branch in the diagnostic center
      for (const branch of center?.branches || []) {
        // Check if the branchId matches
        if (branch?.branchId === branchIdToFind) {
          return branch.roleName; // Return the roleName if a match is found
        }
      }
    }
  }

  return null; // Return null if no match is found
}
