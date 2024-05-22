
a =[1,2,3,4,5]
b =len(a)

print("while loop")

c =0
s = 0
while c<b:
    s = s+a[c]
    c =c+1

    print(s/5)

print("for loop")


k= 0
for x in a:
    k =k +x
print (k/5)