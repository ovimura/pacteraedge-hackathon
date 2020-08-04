package com.ovidiu.dev.qone;

import java.util.HashSet;
import java.util.Set;

public class StringPerm {
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

    static String swap(String str, int i, int j) {
        char c1 = str.toCharArray()[i];
        char c2 = str.toCharArray()[j];
        char[] tmp = str.toCharArray();
        tmp[i] = c2;
        tmp[j] = c1;
        return new String(tmp);
    }

    static void perm(String str, int i, int n) {
        if(i == n-1) {
            System.out.println(str);
            return;
        }
        for(int j = i; j<n; j++) {
            String s = swap(str, i, j);
            perm(s, i+1, n);
        }
    }
    static Set<String> ppp(String str) {
        Set<String> set = new HashSet<>();
        if(str == null) return null;
        if(str.length() == 0) {
            set.add("");
            return set;
        }
        char c = str.charAt(0);
        String tail = str.substring(1);
        Set<String> words = ppp(tail);
        for(String w: words) {
            for(int i=0; i<=w.length(); i++ ) {
                set.add(w.substring(0, i) + c + w.substring(i));
            }
        }
        return set;
    }


    public static void main(String[] args) {
//        Set<String> p = permutations("abc");
//        for(String w : p) {
//            System.out.println(w);
//        }
        Set<String> s = ppp("abc");
        s.forEach(n -> {
            System.out.println(n);
        });
    }
}
