package com.example;

import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.Map;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;

import io.github.bonigarcia.wdm.WebDriverManager;

import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.util.concurrent.TimeUnit;


import java.time.Duration;

/**
 * Unit test for simple App.
 */
public class AppTest {
    private WebDriver driver;

    public Boolean loginTest(){
        
        driver.get("http://localhost:3040/");
        driver.manage().window().setSize(new Dimension(1332, 794));
        driver.findElement(By.cssSelector("#login > p:nth-child(2)")).click();
        driver.findElement(By.id("email")).click();
        driver.findElement(By.id("email")).sendKeys("Test@gmail.com");
        driver.findElement(By.cssSelector("#login > p:nth-child(2)")).click();
        driver.findElement(By.id("password")).click();
        driver.findElement(By.id("password")).sendKeys("123456");
        driver.findElement(By.id("btn-login")).click();
        
        WebElement firstResult = new WebDriverWait(driver, Duration.ofSeconds(10))
        .until(ExpectedConditions.elementToBeClickable(By.cssSelector("#login > p:nth-child(2)")));
        String text =  firstResult.getText();

        // text = "small test";
        System.out.println(text);
      
      if (text.length() > 0 ){
        return true;
      }
      else return false;
        
    }


    @Before
    public void setUp() {
        driver = WebDriverManager.edgedriver().create();
    }

    @After
    public void tearDown() {
        driver.quit();
    }

    @Test
    public void testOne(){

          boolean Test = loginTest(); 
         assertTrue(Test);

    }
   

   
}