package com.ovidiu.dev.qone;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/*
* Author: Ovidiu Mura
* Given a string, write a function to check if it is a permutation of a palindrome.
* A palindrome is a word or phrase that is the same
* forwards and backwards. a permutation is a rearrangement of letters.
* The palindrome does not need to be limited to just dictionary words.
*
* */


public class IsPlaindrome {

    public static boolean isPalindrome(String s) {
        int mid = s.length() / 2;
        for (int i = 0; i < mid; i++) {
            if (s.charAt(i) != s.charAt(s.length()-1 - i))
                return false;
        }
        return true;
    }
    // aabaa
    // aaaaaa
    // aaoo
    // a != o
    // aooa
    public static String charInsert(String str, char c, int j) {
        String b = str.substring(0, j);
        String e = str.substring(j);
        return b + c + e;
    }

    public static Set<String> permutation(String str) {
        Set<String> perm = new HashSet<String>();
        if (str == null) {
            return null;
        } else if (str.length() == 0) {
            perm.add("");
            return perm;
        }
        char initial = str.charAt(0);
        String rem = str.substring(1);
        Set<String> words = permutation(rem);
        for (String strNew : words) {
            for (int i = 0; i <= strNew.length(); i++) {
                perm.add(charInsert(strNew, initial, i));
            }
        }
        return perm;
    }

    static boolean isPal(String str) {
        Map<Character, Integer> map = new HashMap<>();
        Integer val = 0;
        for(int i=0; i<str.length(); i++){
            if(map.keySet().contains(str.charAt(i))) {
                for(Character key : map.keySet()) {
                    if(str.charAt(i) == key) {
                        val = map.get(key);
                        map.put(key, val+1);
                    }
                }
            } else {
                map.put(str.charAt(i), 1);
            }
        }
        int odd = 0;
        for(Character c : map.keySet()) {
            if (map.get(c) %2 == 1) {
                odd += 1;
            }
        }
        if(odd > 1)
            return false;
        return true;
    }


    public static void perm(String str) {
        perm("", str);
    }

    private static void perm(String prefix, String str) {
        int n = str.length();
        if (n == 0) System.out.println(prefix);
        else {
            for (int i = 0; i < n; i++)
                perm(prefix + str.charAt(i), str.substring(0, i) + str.substring(i + 1, n));
        }
    }

    public static void main(String[] args) {
        String str = "aabaa";
        Set<String> s = permutation(str);
        System.out.println(s.size());
        System.out.println(isPal(str));
        // aooa
        for(String ss : s) {
            boolean b = isPalindrome(ss);
            if (b) {
                System.out.println(ss);
            }
        }
    }
}