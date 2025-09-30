export const toUserResponse = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        roleId: user.roleId,
        role: user.role,
        provider: user.provider,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}

export const toUsersListResponse = (users) => {
    return users.map(user => toUserResponse(user));
};