import pandas as pd
import matplotlib.pyplot as plt


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
    import random
    r = random.randint(1,9)

    for i in range(25):
        es.append(Employee("John", "Smith", "Male", "Software Engineer", "Single", 2, 30000*r, 1000))
        r = random.randint(1, 9)
    data = {
        'title': [x.title for x in es],
        'salary': [x.salary for x in es]
    }
    df = pd.DataFrame(data, columns=['title', 'salary'])
    print([x.title for x in es])
    print(df.count())
    df.plot(x='title', y='salary', kind='line')
    plt.show()


if __name__ == "__main__":
    main()
