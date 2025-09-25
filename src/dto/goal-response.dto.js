export const toGoalResponse = (goal) => {
    return {
        id: goal.id,
        businessId: goal.businessId,
        title: goal.title,
        targetAmount: goal.targetAmount,
        progressAmount: goal.progressAmount,
        deadline: goal.deadline,
        status: goal.status,
        createdAt: goal.createdAt,
        updatedAt: goal.updatedAt,
    };
};

export const toGoalListResponse = (goals) => {
    return goals.map(goal => toGoalResponse(goal));
};
