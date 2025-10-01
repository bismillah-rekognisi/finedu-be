export const toTargetResponse = (target) => {
    return {
        id: target.id,
        business: target.business,
        title: target.title,
        amount: target.amount,
        achieved_amount: target.achievedAmount,
        deadline_date: target.deadlineDate,
        status: target.status,
        created_at: target.createdAt, 
        updated_at: target.updatedAt, 
    };
};

export const toTargetListResponse = (targets) => {
    return targets.map(target => toTargetResponse(target));
};
