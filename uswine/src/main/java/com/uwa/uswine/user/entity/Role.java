package com.uwa.uswine.user.entity;

public enum Role {
//    ROLE_USER,
//    ROLE_ADMIN;

    ROLE_USER,
    ROLE_ADMIN,
    ROLE_SELLER,
    ROLE_BAN;

    public static Role getRole(String authority) {
        if ("USER".equals(authority)) {
            return ROLE_USER;
        } else if ("ADMIN".equals(authority)) {
            return ROLE_ADMIN;
        } else if ("SELLER".equals(authority)) {
            return ROLE_SELLER;
        } else if ("BAN".equals(authority)) {
        	return ROLE_BAN;
        }
        // Handle other roles if needed
        return null;
    }

}
