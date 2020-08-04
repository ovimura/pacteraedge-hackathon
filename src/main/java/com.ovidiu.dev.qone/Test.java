package com.ovidiu.dev.qone;

import java.util.HashSet;
import java.util.Set;

public class Test {
    static Set<String> permutations(String str) {
        Set<String> strings = new HashSet<>();
        if(str == null)
            return null;
        else if(str.length() == 0) {
            strings.add("");
            return strings;
        }
        char c = str.charAt(0);
        String rem = str.substring(1);
        Set<String> words = permutations(rem);
        for(String w: words) {
            for(int i=0; i<=w.length(); i++) {
                strings.add(w.substring(0, i) + c + w.substring(i));
            }
        }
        return strings;
    }

    public static void main(String[] args) {
        Set<String> p = permutations("abc");
        for(String w : p) {
            System.out.println(w);
        }
    }
}
