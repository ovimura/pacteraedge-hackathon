import pandas as pd


class Employee(object):
    def __init__(self, fn, ln, g, tl, stat, yrs, sal, lb):
        self.first_name = fn
        self.last_name = ln
        self.gender = g
        self.title = tl
        self.status = stat
        self.yrs_of_experience = yrs
        self.salary = sal
        self.last_bonus = lb

    def calc_aprox_sal(self) -> float:
        def_sal = 30000
        if self.last_name is not None:
            if self.title in ["Software Engineer", "Full Stack Developer", "Software Developer Engineer"]:
                def_sal *= 2
                if self.yrs_of_experience < 2:
                    def_sal *= 1.1
                elif self.yrs_of_experience == 2:
                    def_sal *= 1.3
                elif self.yrs_of_experience > 2:
                    def_sal *= 1.6
                elif self.yrs_of_experience > 6:
                    def_sal *= 2
        return def_sal


def main():
    es = []
    for i in range(25):
        es.append(Employee("John", "Smith", "Male", "Software Engineer", "Single", 2, 30000, 1000))

    df = pd.DataFrame(es)

    print(df.count())


if __name__ == "__main__":
    main()
