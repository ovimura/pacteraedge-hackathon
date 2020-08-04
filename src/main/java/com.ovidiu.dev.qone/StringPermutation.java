package com.ovidiu.dev.qone;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class StringPermutation {

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
        System.out.println(initial + "==" + rem + "> " + words.size());
        for (String strNew : words) {
            for (int i = 0; i <= strNew.length(); i++) {
                perm.add(strNew.substring(0,i) + initial + strNew.substring(i));
            }
        }
        System.out.println(perm.size());
        return perm;
    }

    public static Set<String> permu(String st) {
        Set<String> p = new HashSet<>();
        if(st == null) return null;
        else if(st.length() == 0) {
            p.add("");
            return p;
        }
        char c = st.charAt(0);
        String tail = st.substring(1);
        Set<String> words = permu(tail);
        for(String w: words) {
            for(int i=0; i<=w.length(); i++) {
                p.add(w.substring(0,i) + c + w.substring(i));
            }
        }
        return p;
    }

    static Map<Character, Integer> getCount(String str) {
        Map<Character, Integer> map = new HashMap<>();
        for(int i=0; i<str.length(); i++) {
            if(map.keySet().contains(str.charAt(i))) {
                Integer val = map.get(str.charAt(i))+1;
                map.put(str.charAt(i), val);
            } else {
                map.put(str.charAt(i), 1);
            }
        }
        return map;
    }
    static Set<String> strings = new HashSet<>();


    static String swap(String str, int i, int j) {
        char c1 = str.toCharArray()[i];
        char c2 = str.toCharArray()[j];
        char[] temp = str.toCharArray();
        temp[i] = c2;
        temp[j] = c1;
        return new String(temp);
    }

    public static Set<String> per(String str, int i, int n) {
        if(i == n-1) {
            System.out.println(str);
            strings.add(str);
            return strings;
        }
        for (int j = i; j<n; j++) {
            String s = swap(str, i, j);
            per(s, i+1, n);
        }
        return strings;
    }




























    public static void main(String []args) {
        Set<String> s = per("abcd", 0, 4);
        System.out.println("No of Permutations: " + s.size());
//        for(String str: s) {
//            System.out.println(">" + str);
//        }
        System.out.println(getCount("abcc"));
    }
}
