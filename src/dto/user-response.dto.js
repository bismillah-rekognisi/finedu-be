export function toUserResponse(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        roleId: user.roleId ?? null,
        role: user.role ?? null,
        provider: user.provider,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}