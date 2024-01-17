package com.uwa.uswine.RestApiController;


import com.uwa.uswine.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/user")
public class UserRestApi {

    @PostMapping("/login")
    public Boolean userLogin
            (
                @RequestBody Map<String, Object> user
            )
    {
        System.out.println(user);

        return true;
    }


}
