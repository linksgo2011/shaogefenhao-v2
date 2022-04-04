---
title: Junit 5
toc: true
date: 2021-08-11 19:18:36
categories: 
  - 测试技术
sidebar: auto
permalink: /testing/junit-5/
---

## 例子


### 用Junit5 测试 controller 或者API的例子

```java

package com.tw.api.unit.test.controller;

import com.tw.api.unit.test.domain.todo.Todo;
import com.tw.api.unit.test.domain.todo.TodoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Arrays;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(TodoController.class)
@ActiveProfiles(profiles = "test")
class TodoControllerTest {
    @Autowired
    private TodoController todoController;

    @Autowired
    private MockMvc mvc;

    @MockBean
    private TodoRepository todoRepository;

    @Test
    void getAll() throws Exception {
        //given
        when(todoRepository.getAll()).thenReturn(Arrays.asList(new Todo(1,"first todo",true,0)));
        //when
        ResultActions result = mvc.perform(get("/todos"));
        //then
        result.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$[0].title", is("first todo")))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].completed", is(true)))
                .andExpect(jsonPath("$[0].order", is(0)));
    }
}

```

### 用Junit5测试service的例子

```java
package com.tw.api.unit.test.services;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("A example to test show service with mock strategy")
public class ShowServiceTests {
    private static final String MOCK_OUTPUT = "Mocked show label";

    @Mock
    private TextService textService;

    @InjectMocks
    private ShowService showService;

    @BeforeEach
    void setMockOutput() {
        when(textService.getText()).thenReturn(MOCK_OUTPUT);
    }

    @Test
    @DisplayName("Mock the output of the text service using mockito")
    public void contextLoads() {
        assertEquals(showService.getShowLabel(), MOCK_OUTPUT);
    }
}

```


## 参考资料

- https://www.ibm.com/developerworks/cn/java/j-introducing-junit5-part1-jupiter-api/index.html

