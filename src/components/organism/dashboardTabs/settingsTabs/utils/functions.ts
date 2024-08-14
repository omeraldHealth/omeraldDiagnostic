export function removeBranchById(record, branchIdToRemove) {
    // Iterate over each diagnostic center
    const updatedUser = record.diagnosticCenters.map(center => {
        const updatedBranches = center.branches.filter(branch => branch.branchId !== branchIdToRemove);
        return {
            ...center,
            branches: updatedBranches
        };
    }).filter(center => center.branches.length > 0); 
  
    return updatedUser;
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